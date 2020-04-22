import request from 'superagent'

export const getData = (url) => {
    return request
        .post(`/v1/api/`)
        .send(url)
        .then(res => res.body)
}

