import React from 'react';

class Menu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="sub">
                <h3>User Management</h3>

                <h4>{this.props.isLoggedIn ? this.props.clientMethods.getLoginDetails().user.username : "Current User"}</h4>

                <ul>
                    {!this.props.isLoggedIn ? <li><a href="#/user/login" className="noanimation icon-settings dark"><span>Login</span></a></li> : null}
                    {this.props.isLoggedIn ? <li><a href="#/user/logout" className="noanimation icon-settings dark"><span>Logout</span></a></li> : null}
                </ul>
            </div>
        )
    }
}

export default Menu;