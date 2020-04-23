import React from 'react'
import { getData } from '../apis/api'
import {applySimpleFilter, applyComplexFilter} from '../utils'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      sitemapXML: '',
      filteredXML: '',
      filters: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    getData({url: this.state.url})
      .then(data => {
        this.setState({
          sitemapXML: data.dataArray,
          filteredXML: data.dataArray,
          filters: data.filter
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = (e) => {
    if(e.target.id){
      applySimpleFilter(this.state.sitemapXML, e.target.id, filteredData => {
        this.setState({ filteredXML: filteredData })
      })
    }else{
      this.setState({filteredXML: this.state.sitemapXML})
    }
  }

  handleClickComplex = () => {
    applyComplexFilter(this.state.sitemapXML, this.state.filters, filteredData => {
      this.setState({ filteredXML: filteredData})
    })
  }

  render(){
    const siteData = this.state.filteredXML ? this.state.filteredXML : false 
    return (
      <>
        <h1>Get sitemap.xml data</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="url" onChange={this.handleChange} />
          </label>
            <input type="submit" />
        </form>

        {
          siteData &&
         <>
         <div className='p-2'>
            <h1>All the possible links on this site</h1>
            <h3>Filter options</h3>
            <p>Show only one of the following filters</p>
            <button onClick={this.handleClick}>RESET FILTERS</button>
            <button onClick={this.handleClickComplex}>EXCLUDE THESE FILTERS</button>
         </div>
         <div className='p-2'>
            {
              Object.getOwnPropertyNames(this.state.filters).map(item => {
                return <button className='' key={item} id={item} onClick={this.handleClick}>{item}</button>
              })
            }
          </div>
          <ul>
            {siteData.map((item, i) => {
              return <li key={i}>
                <a href={item}>{item}</a>
              </li>
            })}
          </ul>
         </>
        }
      </>
    )
  }
}

export default App
