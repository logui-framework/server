import React from 'react';
import {Link} from 'react-router-dom';

import BlankMenu from './blank';

class MenuPageComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var menuComponent = <BlankMenu />;

        if (this.props.currentMenuComponent) {
            menuComponent = <this.props.currentMenuComponent {...this.props} />;
        }

        return (
            <nav className="menu">
                <div className="icons">
                    <ul className="top">
                        {this.props.isLoggedIn ? <li><Link className="icon-container icon-application dark hover" to="/applications">Applications</Link></li> : ""}
                        {this.props.isLoggedIn ? <li><Link className="icon-container icon-settings dark hover" to="/settings">Settings</Link></li> : ""}
                    </ul>
                    <ul className="bottom">
                        <li><Link className="icon-container icon-about dark hover" to="/about">About</Link></li>
                        <li className="big"><Link className={`icon-container icon-user hover ${this.props.isLoggedIn ? 'green' : 'dark'}`} to="/user">User Management</Link></li>
                    </ul>
                </div>
                
                {menuComponent}
            </nav>
        )
    }

}

export default MenuPageComponent;