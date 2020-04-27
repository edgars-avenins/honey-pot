const router = require('express').Router()
const request = require('superagent')

const func = require('../dataScrapper')


//get information from robots.txt
router.post('/robots', (req, res) => {
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
router.post('/xml', (req, res) => {
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

module.exports = router