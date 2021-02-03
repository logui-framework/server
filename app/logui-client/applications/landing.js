import React from 'react';
import TrailItem from '../nav/trail/trailItem';

class ApplicationsLandingPage extends React.Component {

    getTrail() {
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/applications" displayText="Applications" />,
        ];
    }

    componentDidMount() {
        this.props.clientMethods.setMenuComponent(<Menu />);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    render() {
        return(
            <main>
                <h1>Applications Landing Page</h1>
            </main>
        )
    };

}

export class Menu extends React.Component {
    render() {
        return(
            <div className="sub">
                <h3>Applications</h3>

                <h4>Current Applications</h4>

                <ul>
                    <li><a href="#" className="noanimation icon-application dark"><span>Application One</span></a></li>
                    <li><a href="#" className="noanimation icon-application dark"><span>Application Two</span></a></li>
                    <li><a href="#" className="noanimation icon-application dark"><span>Application Three</span></a></li>
                </ul>

                <h4>Settings</h4>

                <ul>
                <li><a href="#" className="noanimation icon-add dark"><span>Create New Application</span></a></li>
                </ul>
            </div>
        )
    }
}

export default ApplicationsLandingPage;