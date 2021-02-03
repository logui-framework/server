import React from 'react';
import TrailItem from '../nav/trail/trailItem';

class UserLandingPage extends React.Component {

    getTrail() {
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/user" displayText="User Management" />,
        ];
    }

    componentDidMount() {
        this.props.clientMethods.setMenuComponent(<Submenu />);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    render() {
        return(
            <main>
                <h1>User Landing Page</h1>
            </main>
        )
    };

}

export class Submenu extends React.Component {
    render() {
        return(
            <div className="sub">
                <h3>User Management</h3>

                <h4>Username</h4>

                <ul>
                    <li><a href="#" className="noanimation icon-settings dark"><span>Logout</span></a></li>
                    <li><a href="#" className="noanimation icon-settings dark"><span>Change Password</span></a></li>
                </ul>
            </div>
        )
    }
}

export default UserLandingPage;