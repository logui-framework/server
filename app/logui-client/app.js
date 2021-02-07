import React from 'react';
import ReactDOM from 'react-dom';
import regeneratorRuntime from 'regenerator-runtime'; // Include this for async methods/functions to work

import LogUIClientApp from './client';

ReactDOM.render(
    <React.StrictMode>
        <LogUIClientApp />
    </React.StrictMode>,
    document.getElementById('approot')
);