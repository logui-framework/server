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
                <div class="icons">
                    <ul className="top">
                        <li><Link className="icon-application dark" to="/applications">Applications</Link></li>
                        <li><Link className="icon-settings dark" to="/settings">Settings</Link></li>
                    </ul>
                    <ul className="bottom">
                        <li><Link className="icon-about dark" to="/about">About</Link></li>
                        <li className="big"><Link className={`icon-user ${this.props.isLoggedIn ? 'green' : 'dark'}`} to="/user">User Management</Link></li>
                    </ul>
                </div>
                
                {menuComponent}
            </nav>
        )
    }

}

export default MenuPageComponent;