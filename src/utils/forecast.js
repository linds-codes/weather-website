const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7f1daddc1c922583ff1c121b53bde6c7&query=' + latitude  +',' + longitude + '&units=m'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Error: Unable to connect to the WeatherStack service.', undefined)
        } else if (body.error) {
            callback('Error: WeatherStack did not return data for the location specified.', undefined)
        } else {
            // Forecast Data
            const currentTemp = body.current.temperature
            const currentFeel = body.current.feelslike
            const currentDesc = body.current.weather_descriptions[0].toLowerCase()
            callback(undefined, {
                currentTemp,
                currentFeel,
                currentDesc
            })
        }
    })
}

module.exports = forecast