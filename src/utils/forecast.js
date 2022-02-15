const request = require('request')


//HTTP

const forecast = (latitude,longitude, callback) =>{
    const url =  'http://api.weatherstack.com/current?access_key=284a31e6a5a81985b54ca68e1aa61db1&query='+latitude+','+longitude+'&units=m'
    request({url, json: true }, (error, {body}) => {

        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback('Unable to find your location', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0]+ '. Its currently ' + body.current.temperature + ' ,but feels like '+ body.current.feelslike)
        }
        })
}

module.exports = forecast