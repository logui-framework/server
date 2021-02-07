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
        var isIn = "no";
        if (this.props.isLoggedIn) {
            isIn = "yes";
        }
        return(
            <main>
                <h1>Welcome to LogUI!</h1>
                LogUI is the new way to log interactions in your web-based experiments.
                
                {isIn ? 'You are logged in': 'You are not logged in'}


                
            </main>
        )
    };

}

export default LandingPage;