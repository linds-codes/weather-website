const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmVmcmFrdCIsImEiOiJjazlkYzVxdmkwMGlzM2RtcG82Zjl6aXNlIn0.6OEW0jhivt2_koIlWfoqpw&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Error: Unable to connect to the MapBox service.', undefined)
        } else if (body.features.length === 0) {
            callback('Error: Could not find location matching that search.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode