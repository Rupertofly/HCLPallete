import { render } from 'react-dom';
import React from 'react';
import App from './App';
import Dst from './diskTestApp';
render(React.createElement(Dst), document.querySelector('#app'));
