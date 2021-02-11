const request = require('postman-request');

const forecast = ({latitude, longitude}, callback) => 
{
    const url = `http://api.weatherstack.com/current?access_key=7ae9bbff0c627beec46ff31170005193&query=${latitude},${longitude}`;
    
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
            callback(undefined, `${weather.weather_descriptions[0]}. It is currently ${weather.temperature} degrees out. It feels like ${weather.feelslike} degrees out`);
        }
    })
}

module.exports= forecast;
