import request from 'superagent'

export function getDelfi(year){
    return request
        .get(`/api/v1/delfi/${year}`)
        .then(res => res.body)
}