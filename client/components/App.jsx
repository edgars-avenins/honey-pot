import React from 'react'
import { HashRouter as Router, Route} from 'react-router-dom'

import Nav from './Nav'
import GetXML from './GetXML'
import StuffToday from './StuffToday'
import DelfiToday from './DelfiToday'
import { Home } from './Home'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
     
    }
  }
  
  render() {
    return (
      <Router>
        <Route path='/' component={Nav}/>
        <Route exact path='/' component={Home} />

        <Route path='/xml' component={GetXML}/>
        <Route path='/stuff' component={StuffToday}/>
        <Route path='/delfi' component={DelfiToday}/>
      </Router>
    )
  }
}

export default App
