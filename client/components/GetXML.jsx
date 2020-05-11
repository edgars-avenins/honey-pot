import React from 'react'
import { getRobotData, getXMLData } from '../apis/xml'
import { applySimpleFilter, applyComplexFilter } from '../utils'

class GetXML extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sitemapXML: '',
      filteredXML: '',
      filters: '',
      availableXML: false,
      noData: false
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      sitemapXML: '',
      filteredXML: '',
      filters: '',
      availableXML: false,
      noData: false
    })
    getRobotData({ url: this.state.url })
      .then(data => {
        if (data.length == 0) {
          this.setState({
            noData: true
          })
        } else {
          if (data.isXML && !data.isXML)
            this.setState({
              sitemapXML: data.dataArray,
              filteredXML: data.dataArray,
              filters: data.filter
            })
          else {
            this.setState({ availableXML: data })
          }

        }
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = (e) => {
    if (e.target.id) {
      applySimpleFilter(this.state.sitemapXML, e.target.id, filteredData => {
        this.setState({ filteredXML: filteredData })
      })
    } else {
      this.setState({ filteredXML: this.state.sitemapXML })
    }
  }

  handleClickComplex = () => {
    applyComplexFilter(this.state.sitemapXML, this.state.filters, filteredData => {
      this.setState({ filteredXML: filteredData })
    })
  }

  handleXMLOption = (e) => {
    getXMLData({ url: e.target.id })
      .then(data => {

        if (data.isXML) {
          this.setState({ availableXML: data.dataArray })
        } else {
          this.setState({
            sitemapXML: data.dataArray,
            filteredXML: data.dataArray,
            filters: data.filter
          })
        }
      })
  }

  render() {
    const siteXMLData = this.state.filteredXML ? this.state.filteredXML : false
    const siteXMLOptions = this.state.availableXML
    return (
      <>
        <div className='bg-light p-2 mb-2 mt-3'>
          <h1 className='text-center'>Get robots.txt data</h1>
          <hr className='m-0 mb-3'/>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" name="url" onChange={this.handleChange} />
            </label>
            <input type="submit" />
          </form>
        </div>

        {
          siteXMLData &&
          <>
            <div className='bg-light p-2 mb-2'>
              <h1>All the possible links on this site</h1>
              <h3>Filter options</h3>
              <p>Show only one of the following filters</p>
              <button className='btn btn-info mr-1' onClick={this.handleClick}>RESET FILTERS</button>
              <button className='btn btn-info' onClick={this.handleClickComplex}>EXCLUDE THESE FILTERS</button>
            </div>
            <div className='bg-light p-2'>
              {
                Object.getOwnPropertyNames(this.state.filters).map(item => {
                  return <button className='btn btn-info m-1' key={item} id={item} onClick={this.handleClick}>{item}</button>
                })
              }
            </div>
            <ul className='row bg-light p-2 boxShadow'>
              {siteXMLData.map((item, i) => {
                return <li key={i} className='list listItems col-6 py-2 text-center pointer'>
                  {/* make a function that decides if the link is .xml
                go deeper into the xml tree otherwise show an 
                a tag link to the actual page */}
                  <a href={item}>{item.split('/').pop().replace(/-/g,' ')}</a>
                </li>
              })}
            </ul>
          </>
        }
        {
          (!siteXMLData && siteXMLOptions) &&
          <>
            <div className='bg-light p-2 mb-2'>
              <h1>All the possible xml sitemaps on this site</h1>
              <p>Choose one to display its content</p>
            </div>
            <ul className='row bg-light p-2 boxShadow'>
              {
                siteXMLOptions.map(item => {
                  return <li className='list listItems col-6 py-2 text-center pointer' onClick={this.handleXMLOption} id={item} key={item}>
                    {item}
                  </li>
                })
              }
            </ul>
            {/* 
            <ul className='row p-2 bg bg-light boxShadow'>
              {
                this.state.filteredData.map(link => {
                  return <li key={link} id='list' className='col-6 py-2 text-center'>
                    <a href={link}>{link.split('/').pop().replace(/-/g,' ')}</a>
                  </li>
                })
              }
            </ul>
            */}
          </>
        }
        {
          this.state.noData && 
          <h3>No sitemaps available at this site!</h3>
        }
      </>
    )
  }
}

export default GetXML
