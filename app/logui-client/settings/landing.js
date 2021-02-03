import React from 'react';
import TrailItem from '../nav/trail/trailItem';

class SettingsLandingPage extends React.Component {

    getTrail() {
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/settings" displayText="Settings" />,
        ];
    }

    componentDidMount() {
        this.props.clientMethods.setMenuComponent(<Menu />);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    render() {
        return(
            <main>
                <h1>Settings Landing Page</h1>
            </main>
        )
    };

}

export class Menu extends React.Component {
    render() {
        return(
            <div className="sub">
                <h3>LogUI Settings</h3>

                <h4>Global Settings</h4>

                <ul>
                    <li><a href="#" className="noanimation icon-settings dark"><span>Server Status</span></a></li>
                </ul>
            </div>
        )
    }
}

export default SettingsLandingPage;