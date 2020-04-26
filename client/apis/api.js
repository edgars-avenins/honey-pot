import request from 'superagent'
import { validateUrl } from '../utils'

export const getRobotData = (url) => {
    const goodUrl = validateUrl(url)
    
    return request
    .post(`/v1/api/`)
    .send(goodUrl)
    .then(res => res.body)
    .catch(err => console.error(err))
}

export const getXMLData = (url) => {    
    return request
    .post('/v1/api/xml/')
    .send(url)
    .then(res => {
        return res.body
    })
        .catch(err => console.error(err))

}

