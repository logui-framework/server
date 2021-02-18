import React from 'react';
import TrailItem from '../nav/trail/trailItem';
import LogUIDevice from '../common/logUIDevice';

class SettingsLandingPage extends React.Component {

    getTrail() {
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/settings" displayText="Settings" />,
        ];
    }

    componentDidMount() {
        this.props.clientMethods.setMenuComponent(Menu);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    render() {
        return(
            <main>
                <div className="header-container">
                    <h1><LogUIDevice /> Settings</h1>
                </div>

                <p>
                    As settings are added allowing you to customise this instance of the <LogUIDevice /> server, they will appear here.
                </p>
            </main>
        )
    };

}

export class Menu extends React.Component {
    render() {
        return(
            <div className="sub">
                <h3><LogUIDevice /> Settings</h3>

                {/* <h4>Global Settings</h4>

                <ul>
                    <li><a href="#" className="noanimation icon-container icon-settings dark hover"><span>Server Status</span></a></li>
                </ul> */}
            </div>
        )
    }
}

export default SettingsLandingPage;