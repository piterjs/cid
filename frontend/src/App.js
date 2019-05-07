import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Editor from './components/Editor';
import View from './components/View';

import './App.css';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/editor" component={Editor} />
      <Route path="/view/:id" component={View} />
    </Switch>
  );
}
export default App;
