import React from 'react';
import Menu from '../menu';
import TrailItem from '../../nav/trail/trailItem';
import Constants from '../../constants';
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
        var response = await fetch(`${Constants.SERVER_API_ROOT}application/info/${this.props.match.params.id}`, {
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
        var response = await fetch(`${Constants.SERVER_API_ROOT}flight/info/${this.state.appInfo.id}`, {
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
        
        if (this.state.hasFailed) {
            return(
                <Redirect to="/" />
            );
        }

        if (!this.state.appInfo) {
            return(null); // Could add a loading thing here.
        }

        return(
            <main>
                <section>
                    <div className="header-container">
                        <h1>{this.state.appInfo.name}<span className="subtitle">Flight Listing</span></h1>
                        <ul className="buttons-top">
                            <li><Link to="/applications/flights/xxx/new/">Create New Flight</Link></li>
                        </ul>
                    </div>

                    <p>
                        Flights are the variants for each application. For example, if you are running an experiment with four conditions, your system may be run over four different variants in different locations. For this, you'd set up a flight for each experimental variant.
                    </p>

                    {this.state.flightListing.length == 0 ?
                        <p className="message-box info">The application {this.state.appInfo.name} currently has no flights registered. <Link to="/applications/flights/xxx/new/">Create a new flight</Link> to start tracking interactions!</p>
                        :

                        <div className="table flights">
                            <div className="row header">
                                <span></span>
                                <span><strong>Name/Domain</strong></span>
                                <span className="centre"><strong>Created On</strong></span>
                                <span className="centre"><strong>Session(s)</strong></span>
                                <span className="centre"></span>
                                <span className="centre"></span>
                            </div>

                            {Object.keys(flightListing).map(function(key) {
                                    return (
                                        <FlightListItem key={flightListing[key].id} id={flightListing[key].id} name={flightListing[key].name} is_active={flightListing[key].is_active} created_on={flightListing[key].creation_timestamp} fqdn={flightListing[key].fqdn} sessions={flightListing[key].sessions} />
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
    }

    render() {
        return (
            <div className="row double-height">
                <span><span className="indicator green"></span></span>
                <span className="double">
                <span className="title"><strong>{this.props.name}</strong></span>
                    <span className="subtitle mono"><a href={this.props.fqdn} target="_blank">{this.props.fqdn}</a></span>
                </span>
                <span className="centre">{this.props.created_on}</span>
                <span className="sessions centre">{this.props.sessions}</span>
                <span className="icon"><Link to="/somewhere/" className="icon-token dark">Get Token</Link></span>
                <span className="icon"><Link to="/somewhere/" className="icon-download dark">Download</Link></span>
            </div>
        )
    };

}

export default ViewFlightsPage;