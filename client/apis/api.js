import request from 'superagent'
import { validateUrl } from '../utils'

export const getRobotData = (url) => {
    const goodUrl = validateUrl(url)
    
    return request
    .post(`/v1/api/`)
    .send(goodUrl)
    .then(res => {
        if(res.body.length == 1){
            getXMLData({url: res.body[0]})
                .then(res => res.body)
        }
        else if(res.body.length == 0){
            let {url} = goodUrl
            
            url += 'sitemap.xml'
            getXMLData({url: url})
                .then(res => res.body)

        }else return res.body
    })
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

