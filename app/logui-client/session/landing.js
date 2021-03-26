import React from 'react';
import Menu from '../applications/menu';
import TrailItem from '../nav/trail/trailItem';
import Constants from '../constants';
import LogUIDevice from '../common/logUIDevice';
import {Link, Redirect} from 'react-router-dom';


class ViewSessionPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasFailed: false,
            flightInfo: null,
            sessionListing: [],
        };

        this.toggleFlightStatus = this.toggleFlightStatus.bind(this);
    }

    getTrail() {
        if (this.state.hasFailed || !this.state.flightInfo) {
            return [];
        }

        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/applications" displayText="Applications" />,
            <TrailItem key="3" to={`/applications/${this.state.flightInfo.application.id}`} displayText={this.state.flightInfo.application.name} />,
            <TrailItem key="4" to={`/applications/${this.state.flightInfo.application.id}/${this.state.flightInfo.id}`} displayText={this.state.flightInfo.name} />,
        ];
    }

    async getFlightDetails() {
        var response = await fetch(`${Constants.SERVER_API_ROOT}flight/info/${this.props.match.params.id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `jwt ${this.props.clientMethods.getLoginDetails().token}`
            },
        });

        await response.json().then(data => {
            if (response.status == 200) {
                this.setState({
                    flightInfo: data,
                });

                return;
            }

            this.setState({
                hasFailed: true,
            });
        });
    }

    async getSessionListings() {
        var response = await fetch(`${Constants.SERVER_API_ROOT}session/list/${this.props.match.params.id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `jwt ${this.props.clientMethods.getLoginDetails().token}`
            },
        });

        await response.json().then(data => {
            this.setState({
                sessionListing: data,
            });
        });
    }

    async componentDidMount() {
        await this.getFlightDetails();
        await this.getSessionListings();
        this.props.clientMethods.setMenuComponent(Menu);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            await this.getFlightDetails();
            await this.getSessionListings();
            this.props.clientMethods.setTrailComponent(this.getTrail());
        }
    }

    async toggleFlightStatus() {
        var response = await fetch(`${Constants.SERVER_API_ROOT}flight/info/${this.state.flightInfo.id}/status/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `jwt ${this.props.clientMethods.getLoginDetails().token}`
            },
        });

        await response.json().then(data => {
            let updatedFlightInfo = this.state.flightInfo;
            updatedFlightInfo.is_active = data.is_active;

            this.setState({
                flightInfo: updatedFlightInfo,
            });
        });
    }

    render() {
        let sessionListing = this.state.sessionListing;

        if (this.state.hasFailed) {
            return(
                <Redirect to="/" />
            );
        }

        if (!this.state.flightInfo) {
            return(null); // Could add a loading thing here.
        }

        return (
            <main>
                <section>
                    <div className="header-container">
                        <h1><span onClick={this.toggleFlightStatus} className={`indicator clickable ${this.state.flightInfo.is_active ? 'green' : 'red'}`}></span>{this.state.flightInfo.name}<span className="subtitle">{this.state.flightInfo.application.name}</span></h1>
                        <ul className="buttons-top">
                            <li><Link to={`/flight/${this.state.flightInfo.id}/token/`} className="button">View Authorisation Token</Link></li>
                        </ul>
                    </div>

                    <p>
                        Browsing sessions that have been captured on {this.state.flightInfo.application.name} by <LogUIDevice /> are listed here. Metadata about each session (e.g., the browser used) is shown.
                    </p>
                    {this.state.flightInfo.is_active ?
                        <p><LogUIDevice /> is currently accepting new sessions for this flight.</p>
                        :
                        <p><LogUIDevice /> is <strong>not</strong> currently accepting new sessions for this flight.</p>
                    }

                    {sessionListing.length == 0 ?
                        <p className="message-box info"><LogUIDevice /> has not yet recorded any sessions for this flight.</p>

                        :
                        
                        <div className="table session">
                            <div className="row header">
                                <span><strong>IP Address</strong></span>
                                <span className="centre"><strong>Start Timestamp</strong></span>
                                <span className="centre"><strong>End Timestamp</strong></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            {Object.keys(sessionListing).map(function(key) {
                                return (
                                    <SessionListItem
                                        key={sessionListing[key].id}
                                        id={sessionListing[key].id}
                                        ip={sessionListing[key].ip_address}
                                        splitTimestamps={sessionListing[key].split_timestamps}
                                        agentDetails={sessionListing[key].agent_details}
                                        />
                                );
                            })}
                        </div>
                    }
                </section>
            </main>
        );
    }

}

class SessionListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    getOSFamilyIconClass(familyString) {
        familyString = familyString.toLowerCase();
        let iconClass = 'unknown';

        if (familyString.includes('mac') || familyString.includes('iphone')) {
            iconClass = 'apple';
        }
        else if (familyString.includes('windows')) {
            iconClass = 'windows';
        }
        else if (familyString.includes('linux')) {
            iconClass = 'linux';
        }
        else if (familyString.includes('android')) {
            iconClass = 'android';
        }

        return iconClass;
    }

    getBrowserFamilyIconClass(familyString) {
        familyString = familyString.toLowerCase();
        let iconClass = 'browser';

        if (familyString.includes('chrome') || familyString.includes('chromium')) {
            iconClass = 'chrome';
        }
        else if (familyString.includes('firefox')) {
            iconClass = 'firefox';
        }
        else if (familyString.includes('safari')) {
            iconClass = 'safari';
        }
        else if (familyString.includes('opera')) {
            iconClass = 'opera'
        }
        else if (familyString.includes('edg')) {
            iconClass = 'edge'
        }

        return iconClass;
    }

    render() {
        let iconClassOS = this.getOSFamilyIconClass(this.props.agentDetails.os.family);
        let iconClassBrowser = this.getBrowserFamilyIconClass(this.props.agentDetails.browser.family);

        return (
            <div className="row double-height">
                <span className="double">
                    <span className="title mono">{this.props.ip}</span>
                    <span className="subtitle mono">{this.props.id}</span>
                </span>
                <span className="double centre">
                    <span className="title">{this.props.splitTimestamps.start_timestamp.time.locale}</span>
                    <span className="subtitle">{this.props.splitTimestamps.start_timestamp.date.friendly}</span>
                </span>

                {this.props.splitTimestamps.end_timestamp ?
                    <span className="double centre">
                        <span className="title">{this.props.splitTimestamps.end_timestamp.time.locale}</span>
                        <span className="subtitle">{this.props.splitTimestamps.end_timestamp.date.friendly}</span>
                    </span>
                    
                    :

                    <span className="centre">
                        -
                    </span>
                }

                <span className="icon"><span className={`icon-container icon-${this.props.agentDetails.is_desktop ? 'desktop': 'phone'} dark`}></span></span>
                <span className="icon"><span className={`icon-container icon-${iconClassOS} dark`}></span></span>
                <span className="browser icon"><span className={`icon-container icon-${iconClassBrowser} dark`}></span></span>
                <span><span className={`indicator ${this.props.splitTimestamps.end_timestamp ? 'green' : 'orange'}`}></span></span>
            </div>
        )
    };

}


export default ViewSessionPage;