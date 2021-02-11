const request = require('postman-request');

const geoCode = (address, callback) => 
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2lkZGhhcnRoMTc3IiwiYSI6ImNra29lMmt0ODAxeGkydnA2ZHlyMnM3MXIifQ.9iM6rVBknl7eod-lRvCdnQ&limit=1'

    request({url , json : true}, (error, response) => 
    {
        if(error)
        {
            callback('Unable to connect to location service !', undefined);
        }
        else if(response.body.features.length === 0)
        {
            callback('Unable to find location. Try another search !', undefined);
        }
        else
        {
            const locationData = response.body.features[0];
            const data = {
                longitude : locationData.center[0],
                latitude : locationData.center[1],
                location : locationData.place_name
            }
            callback(undefined, data);
        }
    })
}

module.exports = geoCode;