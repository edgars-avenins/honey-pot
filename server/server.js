const path = require('path')
const express = require('express')
const request = require('superagent')
const cors = require('cors')

const func = require('./dataScrapper')

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(express.urlencoded({extended: false}))

//get information from robots.txt
server.post('/v1/api/', (req, res) => {
    const {url} = req.body
    const fullUrl = url + 'robots.txt'
    
    console.log(fullUrl);
    
    request('get', fullUrl)
        .then(html => {
            // console.log(html)
            func.getSitemapLink(html, (data) => {
                res.json(data)
            })
        })
        .catch(err => console.error(err.error)
        )
})

//get information from sitemap.xml
server.post('/v1/api/xml/', (req, res) => {
    const {url} = req.body

    console.log('xml get: ', url);
    
    request('get', url)
        .then(html => {
            console.log('HERE?','\n',html.text,'\n\n\n\n\n',html.body.toString(),'\n\n\n\n\n\n', html);
            
            func.dataFilter(html, url, (data) => {
                res.json(data)
            })
        })
        .catch(err => {
            console.error('\n',err.response,'\n')
            //res.json(err.response.error)
            res.json('oh no, error')
        })
})

module.exports = server
