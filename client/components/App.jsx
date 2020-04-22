import React from 'react'
import { getData } from '../apis/api'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      sitemapXML: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    getData({url: this.state.url})
      .then(data => {
        this.setState({
          sitemapXML: data
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    const siteData = this.state.sitemapXML ? this.state.sitemapXML : false 
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
           <h1>All the possible links on this site</h1>
          <ul>
            {siteData.map(item => {
              return <li>
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
