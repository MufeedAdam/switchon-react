import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import home from "./Home"
import Form from './pages/form'
import Approved from './pages/approved'
import Notification from './pages/notification'
import Pending from './pages/pending'
import Rejected from './pages/rejected'
import Request from './pages/request'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>

    <Router>
      <Switch>
      
      <Route  path="/home" component={home} />
      <Route exact path="/" component={App} /> 
      </Switch>
      </Router>
  </React.StrictMode>,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
