import React from 'react';
import Constants from '../constants';
import {Link} from 'react-router-dom';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            appListing: [],
            initialised: false,
        }
    }

    async getAppListing() {
        var response = await fetch(`${Constants.SERVER_API_ROOT}application/list/`, {
            method: 'GET',
            headers: {
                'Authorization': `jwt ${this.props.clientMethods.getLoginDetails().token}`
            },
        });

        await response.json().then(data => {
            this.setState({
                appListing: data,
                initialised: true,
            });

            this.props.clientMethods.setMenuShouldUpdate(false);
        });
    }

    async componentDidMount() {
        this.getAppListing();
    }

    componentDidUpdate() {
        this.getAppListing();
    }

    shouldComponentUpdate() {
        if (!this.state.initialised || this.props.clientMethods.shouldMenuUpdate()) {
            return true;
        }

        return false;
    }

    render() {
        let appList = this.state.appListing;
        let appListLength = appList.length;

        let appListRender = (
            <ul>
                {Object.keys(appList).map(function(key) {
                    return (
                        <MenuItem key={appList[key].id} id={appList[key].id} name={appList[key].name} />
                    );
                })}
            </ul>
        );

        return(
            <div className="sub">
                <h3>Applications</h3>

                {appListLength > 0 ? <h4>Current Applications</h4> : <></>}
                {appListLength > 0 ? appListRender : <></>}

                <h4>Settings</h4>
                <ul>
                    <li><Link to="/applications/add/" className="noanimation icon-container icon-add dark hover"><span>Add New Application</span></Link></li>
                </ul>
            </div>
        );
    }
}

class MenuItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <li><Link to={`/applications/${this.props.id}`} className="noanimation icon-container icon-application dark hover"><span>{this.props.name}</span></Link></li>
        );
    }

}

export default Menu;