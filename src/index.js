import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import db from './helpers/db'

db()

ReactDOM.render(<App />, document.getElementById('root'));