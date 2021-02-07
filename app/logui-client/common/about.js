import React from 'react';
import TrailItem from '../nav/trail/trailItem';

class AboutPage extends React.Component {

    getTrail() {
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/about" displayText="About LogUI" />,
        ];
    }

    componentDidMount() {
        this.props.clientMethods.setMenuComponent(null);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    render() {
        return (
            <main>
                <h1>About LogUI</h1>
                Who has written this software?
                What version of the client library works with this version of the server?
            </main>
        );
    }

}

export default AboutPage;