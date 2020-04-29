import React from 'react'
import { getDelfi } from '../apis/delfi'


class DelfiToday extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
   
    }
  }
  
  getData = (e) => {
    getDelfi(e.target.id)
      .then(data => console.log(data))
  }

  render() {

    return (
      <>
        <button id='2019' onClick={this.getData}>CLICK</button>
        <button id='2018' onClick={this.getData}>CLICK</button>
        <button id='2017' onClick={this.getData}>CLICK</button>
        <button id='2016' onClick={this.getData}>CLICK</button>
        <button id='2015' onClick={this.getData}>CLICK</button>
        <button id='2014' onClick={this.getData}>CLICK</button>
        <button id='2013' onClick={this.getData}>CLICK</button>
        <button id='2012' onClick={this.getData}>CLICK</button>
        <button id='2011' onClick={this.getData}>CLICK</button>
        <button id='2010' onClick={this.getData}>CLICK</button>
      </>
    )
  }
}

export default DelfiToday
