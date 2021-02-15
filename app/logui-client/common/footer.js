import React from 'react';
import Constants from '../constants';
import LogUIDevice from '../common/logUIDevice';

class Footer extends React.Component {

    render() {
        return (
            <footer>
                <div>
                    <LogUIDevice /> Control App, version <code>{Constants.LOGUI_CLIENTAPP_VERSION}</code><br />
                    Running on <code>{LOGUI_CLIENTAPP_HOSTNAME}</code>
                </div>
                <div>
                    <a href="https://www.tudelft.nl" target="_blank"><img src={`${LOGUI_CLIENTAPP_STATICROOT}logui/img/tudelft-logo.svg`} alt="Delft University of Technology" /></a>
                </div>
            </footer>
        );
    }

}

export default Footer;