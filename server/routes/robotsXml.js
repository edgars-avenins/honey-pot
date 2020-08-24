const router = require('express').Router()
const request = require('superagent')

const func = require('../functions/xml2links')


//get information from robots.txt
router.post('/robots', (req, res) => {
    const {url} = req.body
    const fullUrl = url + 'robots.txt'
    console.log(fullUrl)
    
    request('get', fullUrl)
        .then(html => {
            func.getSitemapLink(html, (data) => {
                res.json(data)
            })
        })
        .catch(err => {
            console.error('Error:',err.error ? err.error : 'No Robots')
            
            request('get', url + 'sitemap.xml')
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
        }
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