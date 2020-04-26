
function dataFilter(rawData, url, callback){
    let dataArray = []
    if(rawData.text){
        dataArray = rawData.text.split(/<loc>(.*?)<\/loc>/)
    }else{
        dataArray = rawData.body.toString().split(/<loc>(.*?)<\/loc>/)
    }

    dataArray = dataArray.filter(item => !item.includes('<'))

    let filter = { }
    dataArray = dataArray.filter((item, i) => {
        // console.log(item.split(url).join('').split(/(.*?)\//))
        filterItem = item.split(/(.*?)\//)
        for(let i = 0; i < filterItem.length; i++){

            if(filterItem[i] != '' && filterItem[i] != 'https:' && filterItem[i] != 'http:' && !filterItem[i].includes('www.')){
                if(filter.hasOwnProperty(filterItem[i])){
                    filter[filterItem[i]] += 1 
                }else{  
                    filter[filterItem[i]] = 1
                }
            }

        }

        return item
    })
    console.log('Why am I ??? ',url, rawdata);
    
    let isXML = false

    Object.getOwnPropertyNames(filter).forEach(element => {
        console.log(element)
        if(element.includes('sitemap')){
            isXML = true
        }
        if(filter[element] < 5) delete filter[element]
        else if(!isNaN(element)) delete filter[element]
    });


    console.log(filter)
    data = {
        dataArray,
        filter,
        isXML: isXML
    }

    callback(data)
}

function getSitemapLink(robotsTxt, callback){
    console.log(robotsTxt.text);
    
    callback(robotsTxt.text
        .split('\n')
        .filter(item => item.includes('sitemap'))
        .map(item => item.slice(item.indexOf('https'))))
}

module.exports = {
    dataFilter,
    getSitemapLink
}