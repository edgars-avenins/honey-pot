import React from 'react'
import { getDelfi } from '../apis/delfi'


class DelfiToday extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      links: []
    }
  }
  
  getData = (e) => {
    getDelfi(e.target.id)
      .then(data => {
        this.setState({links: data})
      })
  }

  render() {

    return (
      <>
        <button id='2019' onClick={this.getData}>2019</button>
        <button id='2018' onClick={this.getData}>2018</button>
        <button id='2017' onClick={this.getData}>2017</button>
        <button id='2016' onClick={this.getData}>2016</button>
        <button id='2015' onClick={this.getData}>2015</button>
        <button id='2014' onClick={this.getData}>2014</button>
        <button id='2013' onClick={this.getData}>2013</button>
        <button id='2012' onClick={this.getData}>2012</button>
        <button id='2011' onClick={this.getData}>2011</button>
        <button id='2010' onClick={this.getData}>2010</button>

      <ul>
          {
            this.state.links.map(link => {
              return <li><a href={link}>{link}</a></li>
            })
          }
      </ul>
      </>
    )
  }
}

export default DelfiToday
