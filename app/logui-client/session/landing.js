import React from 'react';
import Menu from '../applications/menu';
import TrailItem from '../nav/trail/trailItem';
import Constants from '../constants';
import LogUIDevice from '../common/logUIDevice';


class ViewSessionPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasFailed: false,
            flightInfo: null,
        };
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
            <TrailItem key="5" to={`/session/${this.state.flightInfo.id}`} displayText="Sessions" />,
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

    async componentDidMount() {
        await this.getFlightDetails();
        this.props.clientMethods.setMenuComponent(Menu);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            await this.getFlightDetails();
            this.props.clientMethods.setTrailComponent(this.getTrail());
        }
    }

    render() {
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
                        <h1>Sessions</h1>
                    </div>

                    <p>
                        Sessions are browsing sessions that have been captured by the <LogUIDevice /> client library with {this.state.flightInfo.application.name}.
                    </p>

                    {this.state.flightInfo.sessions == 0 ?
                        <p className="message-box info"><LogUIDevice /> has not yet recorded any sessions for this flight.</p>

                        :
                        
                        <p>Table goes here.</p>
                    }
                </section>
            </main>
        );
    }

}


export default ViewSessionPage;