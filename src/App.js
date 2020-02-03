import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Stores} from './stores';
import {StoreDetails} from './store-details';
import {CreateStore} from './create-store';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact={true}
          path='/'
          component={Stores}
        />
        <Route
          exact={true}
          path='/create'
          component={CreateStore}
        />
        <Route
          path='/item/:id'
          component={StoreDetails}
        />
      </Switch>
    </Router>
  );
}

export default App;
