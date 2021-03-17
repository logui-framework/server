import React from 'react';
import Menu from '../applications/menu';
import TrailItem from '../nav/trail/trailItem';
import Constants from '../constants';
import {Link, Redirect} from 'react-router-dom';

class ViewFlightsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasFailed: false,
            appInfo: null,
            flightListing: [],
        };
    }

    getTrail() {
        if (this.state.hasFailed || !this.state.appInfo) {
            return [];
        }

        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/applications" displayText="Applications" />,
            <TrailItem key="3" to={`/applications/${this.props.match.params.id}`} displayText={this.state.appInfo.name} />,
        ];
    }

    async getAppDetails() {
        var response = await fetch(`${Constants.SERVER_API_ROOT}application/specific/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `jwt ${this.props.clientMethods.getLoginDetails().token}`
            },
        });

        await response.json().then(data => {
            if (response.status == 200) {
                this.setState({
                    appInfo: data,
                });

                return;
            }

            this.setState({
                hasFailed: true,
            })
        });
    }

    async getFlightListing() {
        var response = await fetch(`${Constants.SERVER_API_ROOT}flight/list/${this.state.appInfo.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `jwt ${this.props.clientMethods.getLoginDetails().token}`
            },
        });

        await response.json().then(data => {
            this.setState({
                flightListing: data,
            });
        });
    }

    async componentDidMount() {
        await this.getAppDetails();
        await this.getFlightListing();
        this.props.clientMethods.setMenuComponent(Menu);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            await this.getAppDetails();
            await this.getFlightListing();
            this.props.clientMethods.setTrailComponent(this.getTrail());
        }
    }

    render() {
        let flightListing = this.state.flightListing;
        let authToken = this.props.clientMethods.getLoginDetails().token;
        
        if (this.state.hasFailed) {
            return(
                <Redirect to="/" />
            );
        }

        if (!this.state.appInfo) {
            return(null); // Could add a loading thing here.
        }

        return (
            <main>
                <section>
                    <div className="header-container">
                        <h1>{this.state.appInfo.name}<span className="subtitle">Flight Listing</span></h1>
                        <ul className="buttons-top">
                            <li><Link to={`/flight/${this.state.appInfo.id}/add/`} className="button">Add New Flight</Link></li>
                        </ul>
                    </div>

                    <p>
                        Flights are the variants for each application. For example, if you are running an experiment with four conditions, your system may be run over four different variants in different locations. For this, you'd set up a flight for each experimental variant.
                    </p>

                    {this.state.flightListing.length == 0 ?
                        <p className="message-box info">The application {this.state.appInfo.name} currently has no flights registered. <Link to={`/flight/${this.state.appInfo.id}/add/`}>Add a new flight</Link> to start tracking interactions!</p>
                        :

                        <div className="table flights">
                            <div className="row header">
                                <span></span>
                                <span><strong>Name/Domain</strong></span>
                                <span className="centre"><strong>Created At</strong></span>
                                <span className="centre"><strong>Session(s)</strong></span>
                                <span className="centre"></span>
                                <span className="centre"></span>
                            </div>

                            {Object.keys(flightListing).map(function(key) {
                                    return (
                                        <FlightListItem
                                            key={flightListing[key].id}
                                            id={flightListing[key].id}
                                            name={flightListing[key].name}
                                            isActive={flightListing[key].is_active}
                                            timestampSplit={flightListing[key].creation_timestamp_split}
                                            fqdn={flightListing[key].fqdn}
                                            sessions={flightListing[key].sessions}
                                            authToken={authToken} />
                                    );
                            })}
                        </div>

                    }
                </section>
            </main>
        );
    }

}


class FlightListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isActive: this.props.isActive,
        }

        this.toggleStatus = this.toggleStatus.bind(this);
        this.downloadData = this.downloadData.bind(this);
    };

    async toggleStatus() {
        var response = await fetch(`${Constants.SERVER_API_ROOT}flight/info/${this.props.id}/status/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `jwt ${this.props.authToken}`
            },
        });

        await response.json().then(data => {
            this.setState({
                isActive: data.is_active,
            });
        });
    };

    async downloadData(event) {
        event.preventDefault();

        var response = fetch(`${Constants.SERVER_API_ROOT}flight/download/${this.props.id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `jwt ${this.props.authToken}`
            },
            })
            .then(resp => resp.blob())  // Take the blob that is returned by the server
            .then(blob => {             // "Click" the link for the blob, and it downloads.
                if (blob.size == 0) {
                    alert('There is no log data available to download for this flight at present.');
                    return;
                }
                
                // To simulate a download, create a new anchor element, and add the download attribute.
                // Then 'click' it. This forces the browser to download the blob!
                let link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.setAttribute('download', `logui-${this.props.id}.log`);
                link.click();
            });
    };

    render() {
        return (
            <div className="row double-height">
                <span className="indicator-container"><a><span onClick={this.toggleStatus} className={`indicator clickable ${this.state.isActive ? 'green' : 'red'}`}></span></a></span>
                <span className="double">
                    <span className="title"><strong>{this.props.name}</strong></span>
                    <span className="subtitle mono"><a href={this.props.fqdn} target="_blank">{this.props.fqdn}</a></span>
                </span>
                <span className="double centre">
                    <span className="title">{this.props.timestampSplit.time.locale}</span>
                    <span className="subtitle">{this.props.timestampSplit.date.friendly}</span>
                </span>
                <span className="sessions centre">{this.props.sessions}</span>
                <span className="icon"><Link to={`/flight/${this.props.id}/token/`} className="icon-container icon-token dark hover">Get Token</Link></span>
                <span className="icon"><Link to="" onClick={e => this.downloadData(e)} className="icon-container icon-download dark hover">Download</Link></span>
                <Link to={`/session/${this.props.id}/`} className="row-link">View Flight Sessions</Link>
            </div>
        )
    };

}

export default ViewFlightsPage;