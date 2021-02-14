const request = require('postman-request');

const forecast = ({latitude, longitude}, callback) => 
{
    const url = `http://api.weatherapi.com/v1/current.json?key=fd348c40bfe94277af4142736210401&q=${latitude},${longitude}`;
    
    request({url, json : true}, (error, response) => 
    {
        if(error)
        {
            callback('Unable to connect to weather service !', undefined);
        }
        else if(response.body.error)
        {
            callback(response.body.error.info, undefined);
        }
        else
        {
            const weather = response.body.current;
            let date = weather.last_updated;
            date = date.split(' ');
            const newUrl = `http://api.weatherapi.com/v1/astronomy.json?key=fd348c40bfe94277af4142736210401&q=${latitude},${longitude}&dt=${date[0]}`;
            console.log(newUrl);
            request({url : newUrl, json : true}, (error, result) => {
                callback(undefined, {
                    weather,
                    locationInfo : result.body
                });
            })
        }
    })
}

module.exports= forecast;
