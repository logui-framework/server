import React from 'react';

class BottomLogo extends React.Component {

    render() {
        return (
            <p className="bottom right logo">
                <a href="https://www.tudelft.nl" target="_blank"><img src={`${LOGUI_CLIENTAPP_STATICROOT}logui/img/tudelft-logo.svg`} alt="Delft University of Technology" /></a>
            </p>
        );
    }

}

export default BottomLogo;