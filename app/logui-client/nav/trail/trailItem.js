import React from 'react';
import {Link} from 'react-router-dom';

class TrailItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.to) {
            return(<li><strong>{this.props.displayText}</strong></li>);
        }
        
        return(<li><Link to={this.props.to}><strong>{this.props.displayText}</strong></Link></li>);
    }

}

export default TrailItem;