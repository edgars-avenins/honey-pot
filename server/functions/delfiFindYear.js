const request = require('superagent')

function getYearData(data, year, callback){
    let dataArray = getLinksFromXml(data, year) // array of xml files
    let date = new Date().toLocaleDateString()

    let dateArr = date.split('/')
    let targetDate = [year, dateArr[0].length == 1 ? '0' + dateArr[0] : dateArr[0], dateArr[1].length == 1 ? '0' + dateArr[1] : dateArr[1]].join('-')

    // console.log(targetDate);
    // console.log(getProportion(date));
    
    let switcher = true
    let offSet = 0
    let matchedData = []
    let matchedDataLength = 0
    let dataFound = false
    let i = 1

    recGetData()

    function recGetData(){ // recursively gather data by offsetting initial starting position

        matchedDataLength = matchedData.length //save previous data length
        
        getData(dataArray[Math.floor(dataArray.length * getProportion(date)) + offSet], res => { // proportionally pick one
            matchedData = matchedData.concat(getLinksForDate(res, targetDate)) //get new data value
            // uncomment to see in action with the "Delfi" part
            // console.log('Recursive:\nswitcher: ',switcher,'\n','offSet:',offSet,'i:',i,'\n','data length:',matchedData.length , matchedDataLength,'\n\n');
            
            if(matchedDataLength == matchedData.length){ //while this is true the code is searching by incrementing its step by 1 in each
                if(i == 1 && matchedDataLength != 0){ //if proportion was good enough to guess with 1st try then check at the very end also in the opposite direction
                    offSet = 1 //because if found on first try means that the offset goes in negatives always flip to positive to check positive offset direction as well 
                }else{
                    if(!dataFound){ //as long as there is nothing foumd this block exectues
                        if(switcher){ //handles the direction(postivie or negative) and by setting offSet to i value it checks all records
                            offSet += i
                            switcher = !switcher
                        }else{
                            offSet -= i
                            switcher = !switcher
                        }
                    }else{ //we get here if data was found and no longer new records are being found
                        return callback(getLinks(matchedData))
                    }
                }
                i++
            }else{ //this block actives the !datafound else block while also keeps offsetting in the direction something was found in
                dataFound = true
                if(offSet > 0)offSet++
                else offSet--
            }
            recGetData() //repeat
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
