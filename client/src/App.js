import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import Detail from './components/Detail/Detail'
import LandingPage from './components/LandingPage/LandingPage';


function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path='/'>
        <LandingPage/>
      </Route>
      <Route exact path='/home'>
        <Home/>
      </Route>
      <Route exact path='/pokemon/:id' >
        <Detail/>
      </Route>
      <Route exact path='/form'>
        <Form/>
      </Route>
      </Switch>

    </div>
  );
}

export default App;
