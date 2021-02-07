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
                <ul className="categories">
                    {this.props.isLoggedIn ? <li><Link className="icon-application dark" to="/applications">Applications</Link></li> : null}
                    {this.props.isLoggedIn ? <li><Link className="icon-settings dark" to="/settings">Settings</Link></li> : null}
                    <li><Link className="icon-about dark" to="/about">About</Link></li>
                    <li className="user"><Link className={`icon-user ${this.props.isLoggedIn ? 'green' : 'dark'}`} to="/user">User Management</Link></li>
                </ul>
                
                {menuComponent}
            </nav>
        )
    }

}

export default MenuPageComponent;