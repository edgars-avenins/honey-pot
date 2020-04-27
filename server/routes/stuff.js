const router = require('express').Router()
const request = require('superagent')

router.get('/:year', (req, res) => {
    res.json({data: req.params.year})
})


module.exports = router