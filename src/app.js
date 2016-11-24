import React from 'react'
import { Router, hashHistory } from 'react-router'
import { routes } from './config/routes'

const App = () => (
  <Router history={hashHistory}>
    {routes()}
  </Router>
);

export default App;
