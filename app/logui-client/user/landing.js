import React from 'react';
import Menu from './menu';
import TrailItem from '../nav/trail/trailItem';
import LogUIDevice from '../common/logUIDevice';
import {Link} from 'react-router-dom';

class UserLandingPage extends React.Component {

    constructor(props) {
        super(props);
    }

    getTrail() {
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/user" displayText="User Management" />,
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
                    <h1>User Management</h1>
                </div>

                <p>
                    As more user management features are added to the <LogUIDevice /> control app, they will appear here.
                </p>

                {this.props.isLoggedIn ?
                    <p>You can logout from the <LogUIDevice /> control app by <Link to="/user/logout/">clicking here</Link>.</p>
                    :
                    <p>You can login to the <LogUIDevice /> control app by <Link to="/user/login/">clicking here</Link>.</p>
                }
            </main>
        )
    };

}

export default UserLandingPage;