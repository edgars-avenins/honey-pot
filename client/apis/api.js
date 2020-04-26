import request from 'superagent'
import { validateUrl } from '../utils'

export const getRobotData = (url) => {
    const goodUrl = validateUrl(url)
    console.log('send robot request', url);
    
    return request
    .post(`/v1/api/`)
    .send(goodUrl)
    .then(res => {
        console.log('get robot request', res);
        if(res.body.length == 1){
            return getXMLData({url: res.body[0]})
        }
        else if(res.body.length == 0){
            let {url} = goodUrl
            console.log(url, goodUrl);
            
            url += 'sitemap.xml'
            return getXMLData({url: url})
        }
        return res.body
    })
    .catch(err => console.error(err))
}

export const getXMLData = (url) => {    
    console.log('send xml request', url);
    return request
    .post('/v1/api/xml/')
    .send(url)
    .then(res => {
        console.log('get xml request', res);
        return res.body
    })
        .catch(err => console.error(err))

}

