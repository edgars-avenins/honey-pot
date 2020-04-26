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
    
    
    request('get', fullUrl)
        .then(html => {
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

    
    request('get', url)
        .then(html => {           
            func.dataFilter(html, url, (data) => {
                res.json(data)
            })
        })
        .catch(err => {
            console.error('\n',err.response,'\n')
            //res.json(err.response.error)
            res.status(err.response.status).json(err.response.text)
        })
})

module.exports = server
