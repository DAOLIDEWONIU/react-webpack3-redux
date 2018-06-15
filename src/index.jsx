'use strict';  
import React from 'react';
import {render} from 'react-dom';
import App from './router';
 
let main = () => {
    render(<App />,document.getElementById('app'))
};
window.onload = () => main();

