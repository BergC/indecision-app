import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';

// Normalize.css import for CSS reset to all browsers.
import 'normalize.css/normalize.css';

// Import our styles file.
import './styles/styles.scss';

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));