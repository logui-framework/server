import React from 'react';
import Constants from '../constants';
import {Link} from 'react-router-dom';

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            appListing: [],
        }
    }

    async componentDidMount() {
        var response = await fetch(`${Constants.SERVER_API_ROOT}application/info/`, {
            method: 'GET',
            headers: {
                'Authorization': `jwt ${this.props.clientMethods.getLoginDetails().token}`
            },
        });

        await response.json().then(data => {
            this.setState({
                appListing: data,
            });
        });
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
                    <li><Link to="/applications/new" className="noanimation icon-add dark"><span>Create New Application</span></Link></li>
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
            <li><Link to={`/applications/${this.props.id}`} className="noanimation icon-application dark"><span>{this.props.name}</span></Link></li>
        );
    }

}

export default Menu;