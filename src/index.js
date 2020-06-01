import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import {login} from './components/pages/login';
import {registration} from './components/pages/registration';
import {Header} from './components/header';
import {Notfound} from './components/pages/notFound';

window.React = React

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="main">
        <Header/>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={login} />
          <Route path="/registration" component={registration} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();