import React from 'react';
import TrailItem from '../nav/trail/trailItem';

class LandingPage extends React.Component {
    
    constructor(props) {
        super(props);
    }

    getTrail() {
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
        ];
    }

    componentDidMount() {
        this.props.clientMethods.setMenuComponent(null);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    render() {
        return(
            <main>
                <h1>Landing Page</h1>
            </main>
        )
    };

}

export default LandingPage;