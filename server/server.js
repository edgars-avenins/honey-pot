const path = require('path')
const express = require('express')
const cors = require('cors')

const robotsXmlRoute = require('./routes/robotsXml')
const stuffRoutes = require('./routes/stuff')
const delfiRoutes = require('./routes/delfi')

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(express.urlencoded({extended: false}))

server.use('/api/v1/getxml', robotsXmlRoute)
server.use('/api/v1/stuff', stuffRoutes)
server.use('/api/v1/delfi', delfiRoutes)

module.exports = server
