import React from 'react';
import TrailItem from '../nav/trail/trailItem';

class NotFoundPage extends React.Component {

    getTrail() {
        return [
            <TrailItem key="1" displayText="LogUI" to="/" />,
            <TrailItem key="2" displayText="Page Not Found" />,
        ];
    }

    componentDidMount() {
        this.props.clientMethods.setMenuComponent(null);
        this.props.clientMethods.setTrailComponent(this.getTrail());
    }

    render() {
        return (
            <h1>Page not found!</h1>
        );
    }

}

export default NotFoundPage;