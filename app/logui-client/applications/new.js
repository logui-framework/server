import React from 'react';
import Menu from './menu';
import TrailItem from '../nav/trail/trailItem';

class NewApplicationPage extends React.Component {

    constructor(props) {
        super(props);
    }

    getTrail() {
        return [
            <TrailItem key="1" to="/" displayText="LogUI" />,
            <TrailItem key="2" to="/applications" displayText="Applications" />,
            <TrailItem key="3" to="/applications/new" displayText="Create New Application" />,
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
                    <h1>Create New Application</h1>
                </section>
            </main>
        );
    }

}

export default NewApplicationPage;