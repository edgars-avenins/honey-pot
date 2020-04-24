export function applySimpleFilter(data, filterParam, callback){
    callback(data.filter(item => item.includes(filterParam)))
}

export function applyComplexFilter(data, filters, callback){
    const filterKeys = Object.keys(filters)
    callback(data.filter(item => {
        return filterKeys.every(key => {
            if(item.includes(key)) return false
            return item
        })
    }))
}

export function validateUrl({url}){
    if(url[url.length-1] != '/') url += '/'
    if(!url.includes('https://')) url = 'https://' + url
    return {url: url}
}

