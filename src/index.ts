import { render } from 'react-dom';
import React from 'react';
import App from './App';
import './global.scss';
import * as T from './stateCode';
render(React.createElement(App), document.querySelector('#app'));
