import React from 'react'
import { getDelfi } from '../apis/delfi'


class DelfiToday extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      links: [],
      lang: true
    }
  }
  
  getData = (e) => {
    getDelfi(e.target.id)
      .then(data => {
        this.setState({links: data})
      })
  }

  handleLang = () => {
    this.setState({lang: !this.state.lang})
  }

  render() {

    return (
      <>
      <div className='text-center bg-light pb-1 mb-2 mt-3'>
        <h6><button onClick={this.handleLang} className='ml-1 mt-1'>{this.state.lang ? 'LV' : 'ENG'}</button></h6>
        {
          this.state.lang ? 
          <h1 className='mr-3'>Today on year</h1>
          :
          <h1 className='mr-3'>Šodien</h1>
        }
        <div>
          <button className='m-1' id='2019' onClick={this.getData}>2019</button>
          <button className='m-1' id='2018' onClick={this.getData}>2018</button>
          <button className='m-1' id='2017' onClick={this.getData}>2017</button>
          <button className='m-1' id='2016' onClick={this.getData}>2016</button>
          <button className='m-1' id='2015' onClick={this.getData}>2015</button>
        </div>
        <div>
          <button className='m-1' id='2014' onClick={this.getData}>2014</button>
          <button className='m-1' id='2013' onClick={this.getData}>2013</button>
          <button className='m-1' id='2012' onClick={this.getData}>2012</button>
          <button className='m-1' id='2011' onClick={this.getData}>2011</button>
          <button className='m-1' id='2010' onClick={this.getData}>2010</button>
        </div>
        {
          this.state.lang ? 
          <h1>in Latvia</h1>
          :
          <h1>gadā Latvijā</h1>
        }
      </div>
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
            {
              this.state.links.length > 0 &&
                <ul className='row p-2 bg bg-light boxShadow'>
                    {
                      this.state.links.map((link, i) => {
                        return <li key={i} className='list col-6 py-2 text-center'>
                          <a href={link}>{link.split('/').pop().split('.d?id').reverse().pop().replace(/-/g,' ')}</a>
                          </li>
                      })
                    }
                </ul>
            }
      </>
    )
  }
}

export default DelfiToday
