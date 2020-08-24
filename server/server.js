const path = require('path')
const express = require('express')
const cors = require('cors')
const server = express()

const robotsXmlRoute = require('./routes/robotsXml')
const stuffRoutes = require('./routes/stuff')
const delfiRoutes = require('./routes/delfi')


server.use(cors())
server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(express.urlencoded({extended: true}))

server.use('/api/v1/getxml', robotsXmlRoute)
server.use('/api/v1/stuff', stuffRoutes)
server.use('/api/v1/delfi', delfiRoutes)

module.exports = server
