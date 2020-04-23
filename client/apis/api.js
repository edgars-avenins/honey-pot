import request from 'superagent'
import { validateUrl } from '../utils'

export const getData = (url) => {
    const goodUrl = validateUrl(url)
    return request
        .post(`/v1/api/`)
        .send(goodUrl)
        .then(res => res.body)
}

