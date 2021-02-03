import React from 'react';
import ReactDOM from 'react-dom';

import LogUIClientApp from './client';

ReactDOM.render(
    <React.StrictMode>
        <LogUIClientApp />
    </React.StrictMode>,
    document.getElementById('approot')
);