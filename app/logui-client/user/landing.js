import React from 'react';
import Menu from './menu';
import TrailItem from '../nav/trail/trailItem';

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
                <section>
                    <h1>User Landing Page</h1>
                </section>
            </main>
        )
    };

}

export default UserLandingPage;