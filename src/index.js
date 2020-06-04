import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import {login} from './components/pages/login';
import {registration} from './components/pages/registration';
import {Header} from './components/header';
import {Notfound} from './components/pages/notFound';

import './index.css';
import App from './App';
import reducer from './rootReducer';

//           final state
export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // chrome devtools thing
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
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
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();