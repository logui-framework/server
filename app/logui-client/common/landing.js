import React from 'react';
import TrailItem from '../nav/trail/trailItem';
import Footer from './footer';
import LogUIDevice from './logUIDevice';
import {Link} from 'react-router-dom';

class LandingPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.getMessage = this.getMessage.bind(this);
    }

    getTrail() {
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
        ];
    }

    componentDidMount() {
        this.props.clientMethods.setMenuComponent(null);
        this.props.clientMethods.setTrailComponent(this.getTrail());

        this.props.clientMethods.clearLandingMessage();
    }

    getMessage() {
        switch(this.props.landingMessage) {
            case 1:
                return <span>You have successfully logged out of the app.</span>
            case 2:
                return <span>You are now logged in.</span>
            default:
                return null;
        }
    }

    render() {
        let message = this.getMessage();

        return(
            <main>
                <section>
                    <h1>Welcome to <LogUIDevice />!</h1>
                    
                    {message ?
                        <div className="message-box info">
                            {message}
                        </div>
                    : ""}

                    <p>
                        <LogUIDevice /> is a new way of logging user interactions within your web-based experiments. This is the <LogUIDevice /> server app, which allows you to control what web applications that you want to track.
                    </p>

                    {this.props.isLoggedIn ?
                        <p>Select one of the options from below to begin.</p>
                    :
                        <p><strong>Before you can do that, you need to login. <Link to="/user/login/">Click here</Link> to do so.</strong></p>
                    }

                    {this.props.isLoggedIn ?
                        <ul className="menu-grid">
                            <li>
                                <Link to="/applications/">
                                    <span className="header"><strong>Manage Applications</strong></span>
                                    <span className="blurb">Click here to manage what applications this instance of <LogUIDevice /> is tracking.</span>
                                    <span className="icon icon-container icon-application dark"></span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/settings/">
                                    <span className="header"><strong>Settings</strong></span>
                                    <span className="blurb">Tweak settings related to this instance of the <LogUIDevice /> server.</span>
                                    <span className="icon icon-container icon-settings dark"></span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about/">
                                    <span className="header"><strong>About <LogUIDevice /></strong></span>
                                    <span className="blurb">View more information about <LogUIDevice />.</span>
                                    <span className="icon icon-container icon-about dark"></span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user/logout/">
                                    <span className="header"><strong>Logout</strong></span>
                                    <span className="blurb">Click here to safely logout of this instance of the <LogUIDevice /> server app.</span>
                                    <span className="icon icon-container icon-key dark"></span>
                                </Link>
                            </li>
                        </ul>
                    : ""}
                </section>

                <Footer />
            </main>
        )
    };

}

export default LandingPage;