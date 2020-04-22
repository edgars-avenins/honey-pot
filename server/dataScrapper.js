
function dataFilter(rawData, callback){
    let dataArray = []
    if(rawData.text){
        dataArray = rawData.text.split(/<loc>(.*?)<\/loc>/)
    }else{
        dataArray = rawData.body.toString().split(/<loc>(.*?)<\/loc>/)
    }

    dataArray = dataArray.filter(item => !item.includes('<'))
    
    callback(dataArray)
}

module.exports = dataFilter