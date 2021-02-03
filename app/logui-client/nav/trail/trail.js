import React from 'react';
import TrailItem from './trailItem';

class TrailPageComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var trailSequence = [<TrailItem key="1" to="/" displayText="LogUI" />];

        if (this.props.currentTrail) {
            trailSequence = this.props.currentTrail;
        }

        return (
            <nav className="trail">
                <ul>
                    {trailSequence}
                </ul>
            </nav>
        );
    }

}

export default TrailPageComponent;