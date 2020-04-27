import React from 'react'
import { getNews } from '../apis/stuff'


class StuffToday extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }
  
  handleClick = (e) => {
    getNews(e.target.id)
      .then(data => console.log(data))
  }

  render() {

    console.log(new Date().toLocaleDateString());
    
    return (
      <>
        <h1>Today ... years ago</h1>
        <button onClick={this.handleClick} id='1'>1</button>
        <button onClick={this.handleClick} id='2'>2</button>
        <button onClick={this.handleClick} id='3'>3</button>
        <button onClick={this.handleClick} id='4'>4</button>
        <button onClick={this.handleClick} id='5'>5</button>

       
      </>
    )
  }
}

export default StuffToday
