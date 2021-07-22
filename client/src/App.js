import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Landing} from './Components/Landing';
import {Home} from './Components/Home';
import {Details} from './Components/Details';
import { Activity } from './Components/Activity';



function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/countries' component={Home}/>
        <Route path='/countries/:id' component={Details}/>
        <Route path='/activity' component={ Activity }/>
      </div>
    </BrowserRouter>
  );
}

export default App;
