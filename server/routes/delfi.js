const express = require('express')
const router = express.Router()
const request = require('superagent')

const func = require('../functions/delfiFindYear')

router.get('/:year', (req, res) => {
    
    const url = 'https://www.delfi.lv/sitemap.xml'

    request('get', url)
        .then(html => {
            func(html, req.params.year, data => {
                res.status(200).json(data)
            })
        })
})

module.exports = router
