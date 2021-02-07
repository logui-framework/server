import React from 'react';
import Menu from './menu';
import TrailItem from '../nav/trail/trailItem';

class ApplicationsLandingPage extends React.Component {

    getTrail() {
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/applications" displayText="Applications" />,
        ];
    }

    componentDidMount() {
        this.props.clientMethods.setMenuComponent(Menu);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    render() {
        return(
            <main>
                <h1>Applications Landing Page</h1>

                <ul>

                </ul>
            </main>
        )
    };

}

export default ApplicationsLandingPage;