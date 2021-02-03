import React from 'react';
import {Link} from 'react-router-dom';
import Constants from '../constants';

class HeaderPageComponent extends React.Component {

    render() {
        return (
            <header className="tudelft">
                <Link to="/"><img src={`${LOGUI_CLIENTAPP_STATICROOT}logui/img/logo.svg`} alt="LogUI Logo" /></Link>
                <span className="version">v{`${Constants.LOGUI_CLIENTAPP_VERSION}`}</span>
                <span className="tagline">Server Preview</span>
            </header>
        );
    }

}

export default HeaderPageComponent;