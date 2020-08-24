import request from 'superagent'
import { validateUrl } from '../utils'

export const getRobotData = (url) => {
    const goodUrl = validateUrl(url)
    
    return request
    .post(`/api/v1/getxml/robots`)
    .send(goodUrl)
    .then(res => res.body)
    .catch(err => console.error(err))
}

export const getXMLData = (url) => {    
    return request
    .post('/api/v1/getxml/xml/')
    .send(url)
    .then(res => {
        return res.body
    })
        .catch(err => console.error(err))

}

