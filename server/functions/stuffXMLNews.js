function getXMLfileBasedOnDate(xml, year, callback){    
    let date = new Date().toLocaleDateString().split('/')
    let searchDate = [date[2]- year, date[0], date[1]].join('/')
    
    callback(xml.body.toString()
        .split(/<loc>(.*?)<\/loc>/)
        .filter(site => site.includes(searchDate))
        )
}

module.exports = getXMLfileBasedOnDate