import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/Home'
import SubmitProject from './components/SubmitProject'

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={Home}/>
      <Route path='/submit' component={SubmitProject} />
    </Router>
  )
}

export default App
