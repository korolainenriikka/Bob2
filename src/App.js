import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

import Calendar from './components/Calendar'
import Today from './components/Today'

function App() {
  return (
    <Router>
      <div>
        <Link to="/">koti</Link>
        <Link to="/calendar">kalenteri</Link>
      </div>

      <Switch>
        <Route path="/calendar">
          <Calendar />
        </Route>
        <Route path="/">
          <Today />
        </Route>
      </Switch>
  
    </Router>
  ) 
}

export default App;
