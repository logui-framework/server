import React from 'react';
import {Redirect} from 'react-router-dom';

class UserLogoutPage extends React.Component {
    constructor(props) {
        super(props);

        props.clientMethods.logout();
    }

    render() {
        return (<Redirect to="/" />);
    };

}

export default UserLogoutPage;