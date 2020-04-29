const request = require('superagent')

function getYearData(data, year, callback){
    let dataArray = getLinksFromXml(data, year) // array of xml files
    let date = new Date().toLocaleDateString()

    let dateArr = date.split('/')
    let targetDate = [year, dateArr[0].length == 1 ? '0' + dateArr[0] : dateArr[0], dateArr[1].length == 1 ? '0' + dateArr[1] : dateArr[1]].join('-')

    console.log(targetDate);
    

    console.log(getProportion(date));
    


    let switcher = true
    let offSet = 0
    let matchedData = []
    let matchedDataLength = 0
    let dataFound = false
    let i = 1

    recGetData()
        //.then(data => callback(data))

    function recGetData(){ // recursively gather data by offsetting initial starting position

        matchedDataLength = matchedData.length
        
        getData(dataArray[Math.floor(dataArray.length * getProportion(date)) + offSet], res => { // proportionally pick one
            matchedData = matchedData.concat(getLinksForDate(res, targetDate))
            //console.log('Recursive:\nswitcher: ',switcher,'\n','offSet:',offSet,'i:',i,'\n','data length:',matchedData.length , matchedDataLength,'\n\n');
            
            if(matchedDataLength == matchedData.length){
                if(i == 1 && matchedDataLength != 0){
                    offSet = 1
                }else{
                    if(!dataFound){
                        if(switcher){
                            offSet += i
                            switcher = !switcher
                        }else{
                            offSet -= i
                            switcher = !switcher
                        }
                    }else{
                        callback(getLinks(matchedData))
                    }
                }
                i++
            }else{
                dataFound = true
                if(offSet > 0)offSet++
                else offSet--
            }
            recGetData()
        })
    }


}

function getLinks(data){
    let result = []
    data.map(item => {

            item.split(/<loc>(.*?)<\/loc>/).filter(el => {
                if(!el.includes('<'))
                if(el.includes('http')) result.push(el)
            })
    })
    return result
}

function getLinksForDate(data, year){
    // if(data.text){
    //     dataArray = data.text.split(/<loc>(.*?)<\/loc>/)
    // }else{
    //     dataArray = data.body.toString().split(/<loc>(.*?)<\/loc>/)
    // }
    dataArray = data.text.split('<url>')

    dataArray = dataArray.filter(item => item.includes(year))
    // dataArray = dataArray.filter(item => !item.includes('<'))
    return dataArray
}

function getLinksFromXml(data, year){
    if(data.text){
        dataArray = data.text.split(/<loc>(.*?)<\/loc>/)
    }else{
        dataArray = data.body.toString().split(/<loc>(.*?)<\/loc>/)
    }
    dataArray = dataArray.filter(item => item.includes(year))
    dataArray = dataArray.filter(item => !item.includes('<'))
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
