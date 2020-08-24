import request from 'superagent'

export function getNews(year){
    return request
        .get(`/api/v1/stuff/${year}`)
        .then(res => res.body)
}