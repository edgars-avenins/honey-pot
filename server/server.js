const path = require('path')
const express = require('express')
const request = require('superagent')

const func = require('./dataScrapper')

const server = express()


server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.post('/v1/api/', (req, res) => {
    const {url} = req.body
    const fullUrl = url + 'sitemap.xml'
    
    request
        .get(fullUrl)
        .then(html => {
            // console.log(html)
            func(html, (data) => {
                res.json(data)
            })
        })
        .catch('This is errrorrrr')
})

module.exports = server
