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
    this.setState({years: e.target.id})
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
    applyComplexFilter(this.state.links, this.state.filters, filteredData => {
      this.setState({ filteredData: filteredData })
    })
  }

  render() {
    //nestrada filtrs -salabo!
    return (
      <>
        <div className='text-center pb-5'>
          <h1>Today {this.state.years ? this.state.years : '...'} years ago</h1>
          <button className='btn btn-lg btn-danger px-3 m-1' onClick={this.handleClick} id='1'>1</button>
          <button className='btn btn-lg btn-danger px-3 m-1' onClick={this.handleClick} id='2'>2</button>
          <button className='btn btn-lg btn-danger px-3 m-1' onClick={this.handleClick} id='3'>3</button>
          <button className='btn btn-lg btn-danger px-3 m-1' onClick={this.handleClick} id='4'>4</button>
          <button className='btn btn-lg btn-danger px-3 m-1' onClick={this.handleClick} id='5'>5</button>
        </div>

        {
          this.state.links.length > 0 &&

        <div className='p-2 '>
          <div className='py-2 text-center bg-light'>
            <h3>Filter options</h3>
            <p>Show only one of the following filters</p>
          </div>
        
          <div className='py-1 mb-3 bg bg-light text-center boxShadow'>
            {
              Object.getOwnPropertyNames(this.state.filters).map(item => {
                return <button className='p-1 m-1 btn btn-info' key={item} id={item} onClick={this.handleClickSimple}>{item}</button>
              })
            }
            <div className='text-center boxShadow'>
              <p>or</p>
              <button className='p-1 m-1 btn btn-success' onClick={this.handleClickSimple}>RESET FILTERS</button>
              <button className='p-1 m-1 btn btn-warning' onClick={this.handleClickComplex}>EXCLUDE THESE FILTERS</button>
            </div>
          </div>
        

            <ul className='row p-2 bg bg-light boxShadow'>
              {
                this.state.filteredData.map(link => {
                  return <li key={link} id='list' className='col-6 py-2 text-center'>
                    <a href={link}>{link.split('/').pop().replace(/-/g,' ')}</a>
                  </li>
                })
              }
            </ul>

        
        </div>
        }
       
      </>
    )
  }
}

export default StuffToday
