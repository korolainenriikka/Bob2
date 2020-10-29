import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

import Calendar from './components/Calendar'
import Today from './components/Today'
import calendarService from './services/calendarService'

const App = () => {
  const [calendarEntries, setCalendarEntries] = useState([])

  useEffect(() => {
    calendarService
      .getAll()
      .then((calendar) => {
        deleteOldEntries(calendar)
        setCalendarEntries(calendar.sort(sortByTime))
      })
  }, [])

  const deleteOldEntries = (calendar) => {
    calendar.forEach(entry => {
      if (Date.parse(entry.dateTime) < Date.now()) {
        calendarService.remove(entry._id)
      }
    })
  }

  const sortByTime = (e1,e2) => {
    if (e1.dateTime < e2.dateTime){
      return -1
    } else if (e1.dateTime > e2.dateTime){
      return 1
    } else {
      return 0
    }
  }

  return (
    <Router>
      <div>
        <Link to="/">koti</Link>
        <Link to="/calendar">kalenteri</Link>
      </div>

      <Switch>
        <Route path="/calendar">
          <Calendar
            calendarEntries={calendarEntries}
            setCalendarEntries={setCalendarEntries}
            sortByTime={sortByTime}
          />
        </Route>
        <Route path="/">
          <Today
            calendarEntries={calendarEntries}
          />
        </Route>
      </Switch>
  
    </Router>
  ) 
}

export default App;
