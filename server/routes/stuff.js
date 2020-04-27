const router = require('express').Router()
const request = require('superagent')

const func = require('../functions/stuffXMLNews')
const filter = require('../functions/xml2links')

router.get('/:year', (req, res) => {
    const url = 'https://www.stuff.co.nz/sitemap/sitemap.xml'

    request('get', url)
        .then(data => {
            func(data, req.params.year, xmlFound => {
                request('get', xmlFound[0])
                    .then(news => {
                        filter.dataFilter(news, xmlFound[0], data =>{
                            res.json(data)
                        })
                    })
            })
        })


})


module.exports = router