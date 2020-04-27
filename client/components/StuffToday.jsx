import React from 'react'
import { getNews } from '../apis/stuff'
import { applySimpleFilter, applyComplexFilter } from '../utils'


class StuffToday extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      links: [],
      filteredData: [],
      filters: {}
    }
  }
  
  handleClick = (e) => {
    getNews(e.target.id)
      .then(data => {
        this.setState({
          links: data.dataArray,
          filteredData: data.dataArray,
          filters: data.filter
        })
      })
  }

  handleClickSimple = (e) => {
    if (e.target.id) {
      applySimpleFilter(this.state.links, e.target.id, filteredData => {
        this.setState({ filteredData: filteredData })
      })
    } else {
      this.setState({ filteredData: this.state.links })
    }
  }

  handleClickComplex = () => {
    applyComplexFilter(this.state.sitemapXML, this.state.filters, filteredData => {
      this.setState({ filteredXML: filteredData })
    })
  }

  render() {
    //nestrada filtrs -salabo!
    return (
      <>
        <h1>Today ... years ago</h1>
        <button onClick={this.handleClick} id='1'>1</button>
        <button onClick={this.handleClick} id='2'>2</button>
        <button onClick={this.handleClick} id='3'>3</button>
        <button onClick={this.handleClick} id='4'>4</button>
        <button onClick={this.handleClick} id='5'>5</button>

        <div className='p-2'>
          <h3>Filter options</h3>
          <p>Show only one of the following filters</p>
          <button onClick={this.handleClickSimple}>RESET FILTERS</button>
          <button onClick={this.handleClickComplex}>EXCLUDE THESE FILTERS</button>
        </div>
        <div className='p-2'>
          {
            Object.getOwnPropertyNames(this.state.filters).map(item => {
              return <button className='' key={item} id={item} onClick={this.handleClickSimple}>{item}</button>
            })
          }
        </div>
        <div className='p-2'>
          <ul>
            {
              this.state.links.map(link => {
                return <li key={link}>
                  <a href={link}>{link}</a>
                </li>
              })
            }
          </ul>
        </div>
       
      </>
    )
  }
}

export default StuffToday
