import React from 'react';
import Constants from '../constants';

class LoadingSplash extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hideElement: false
        };
    }

    componentDidUpdate() {
        if (this.props.hideSplashScreen && !this.state.hideElement) {
            setTimeout(
                () => {
                    this.setState({
                        hideElement: true
                    });
                },
                Constants.SPLASH_FADE_DURATION
            );
        }
    }

    render() {
        return (
            <div id="loadingSplash" className={`${this.props.hideSplashScreen ? "fadeOut" : ""} ${this.state.hideElement ? "hide" : ""}`}>
                <img src={`${LOGUI_CLIENTAPP_STATICROOT}logui/img/logo.svg`} alt="LogUI Logo" />
            </div>
        );
    }

}

export default LoadingSplash;