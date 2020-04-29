const request = require('superagent')

function getYearData(data, year, callback){
    let dataArray = getLinksFromXml(data, year)
    let date = new Date().toLocaleDateString()



    console.log(getProportion(date));
    


    

    getData(dataArray[Math.floor(dataArray.length * getProportion(date))], res => {
        
        //combineLinkWithTime(getTimeStamps(res), getLinksFromXml(res, null))
        callback(getTimeStamps(res))
    })

}

function getTimeStamps(data){
    if(data.text){
        dataArray = data.text.split(/<lastmod>(.*?)<\/lastmod>/)
    }else{
        dataArray = data.body.toString().split(/<lastmod>(.*?)<\/lastmod>/)
    }
    dataArray = dataArray.filter(item => !item.includes('<'))
    dataArray = dataArray.map(item => item.slice(0,10))

    return dataArray
}

function getLinksFromXml(data, year){
    if(data.text){
        dataArray = data.text.split(/<loc>(.*?)<\/loc>/)
    }else{
        dataArray = data.body.toString().split(/<loc>(.*?)<\/loc>/)
    }
    dataArray = dataArray.filter(item => !item.includes('<'))
    if(year) dataArray = dataArray.filter(item => item.includes(year))
    return dataArray
}

function getData(url, callback){
    request('get', url)
        .then(data => callback(data))
}

function getProportion(date){
    let prop = 0
    let days = 0

    date.split('/').map((item, i) => {
        
        if(i === 0){
            days = (item-1) * 30
        }else if(i === 1){
            days += Number(item)
        }
        return item
    })
    
    prop = days/360
    return prop
}

module.exports = getYearData
