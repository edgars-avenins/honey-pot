const router = require('express').Router()
const request = require('superagent')

const func = require('../functions/delfiFindYear')

router.get('/:year', (req, res) => {
    const url = 'https://www.delfi.lv/sitemap.xml'
    request('get', url)
    .then(html => {
            func.getYearData(html, req.params.year, data => {
                res.status(200).json(data)
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.message})
        })
})

module.exports = router