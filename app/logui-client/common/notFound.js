import React from 'react';
import TrailItem from '../nav/trail/trailItem';
import LogUIDevice from '../common/logUIDevice';

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
            <main>
                <section>
                    <h1>Page Not Found</h1>
                    <p><LogUIDevice /> could not find the page you are looking for.</p>
                </section>
            </main>
        );
    }

}

export default NotFoundPage;