import React from 'react';
import TrailItem from '../nav/trail/trailItem';
import Constants from '../constants';
import LogUIDevice from '../common/logUIDevice';

class AuthorisationTokenPage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            hasCopied: 0,
            flightInfo: null,
            hasFailed: false,
        };

        this.copyAuthorisationCode = this.copyAuthorisationCode.bind(this);
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
            })
        });
    }

    getTrail() {
        if (this.state.hasFailed || !this.state.flightInfo) {
            return [];
        }

        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/applications" displayText="Applications" />,
            <TrailItem key="3" to={`/applications/${this.state.flightInfo.application.id}`} displayText={this.state.flightInfo.application.name} />,
            <TrailItem key="4" to={`/flight/${this.state.flightInfo.id}/`} displayText={this.state.flightInfo.name} />,
            <TrailItem key="5" to={`/flight/${this.state.flightInfo.id}/token/`} displayText="Authorisation Token" />,
        ];
    }

    async componentDidMount() {
        await this.getFlightDetails();
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            await this.getFlightDetails();
            this.props.clientMethods.setTrailComponent(this.getTrail());
        }
    }

    copyAuthorisationCode() {
        let authorisationTokenElement = document.querySelector('#logui-flight-authorisation-token');
        let range = document.createRange();
        range.selectNode(authorisationTokenElement);

        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        document.execCommand('copy');

        window.getSelection().removeAllRanges();

        this.setState({
            hasCopied: true,
        });

        setTimeout(() => {
            this.setState({
                hasCopied: false,
            });
        }, 2000);
    }

    render() {
        let flightInfo = this.state.flightInfo;
        
        if (this.state.hasFailed) {
            return(
                <Redirect to="/" />
            );
        }

        if (!this.state.flightInfo) {
            return(null); // Could add a loading thing here.
        }

        return(
            <main>
                <section>
                    <div className="header-container">
                        <h1><LogUIDevice /> Flight Authorisation Token</h1>
                    </div>

                    <p>
                        In order for you to track user interactions on your application at <code>{flightInfo.fqdn}</code>, you need to provide the <LogUIDevice /> client you are using on that application with an authorisation code. This code provides the <LogUIDevice /> server with information telling who is connecting to it, and from where.
                    </p>

                    <p>
                        The code you must use for this particular application flight is shown below. Paste this into your <LogUIDevice /> client configuration object. Click the button to copy it to your device's clipboard.
                    </p>

                    <div className={`message-box buttons info ${this.state.hasCopied ? 'success' : ''}`}>
                        <code id="logui-flight-authorisation-token">
                            reifhe9bhufui43ur8eyt8743up3hf983gy78rhuvh938hf8fh3djpjd3u289ryf834u8ru2y89ufw90fu3489tygji3gjirvjewfu8934uy3fh2894fj483u3nv9834j8943jr9ijc23u4938u9gjrfj3489fj4398jf
                        </code>
                        <ul className="buttons">
                            <li><button onClick={this.copyAuthorisationCode}>Copy Authorisation Token to Clipboard</button></li>
                        </ul>
                    </div>

                    <p className="alert-text">
                        Note that this code is unique to this particular application flight. Make sure you are using the correct code and the domain you specified is correct; any incorrect information will lead to interaction data not being logged.
                    </p>
                </section>
            </main>
        )
    };

}

export default AuthorisationTokenPage;