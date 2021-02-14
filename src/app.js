const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express();

const port = process.env.PORT || 3000;


// Define paths for Express config
const publicDirectory = path.join(__dirname,'../public');
const viewsDirectory = path.join(__dirname,'../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory)

// Setup static directory to serve
app.use(express.static(publicDirectory))


// Setup routes

app.get('', (req, res) => {
    // render is used to load template which allows to use dynamic html
    res.render('index.hbs', {
        title : 'Weather App',
        name : 'Siddharth Patel'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Page',
        name : 'Siddharth Patel'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title : 'Help Page',
        name : 'Siddharth Patel',
        message : 'This is help page. It provide help to various components'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({Error : 'You must provide an address !'})
    }

    geoCode(req.query.address, (error, response) => {
        if(error)
        {
            return res.send({
                error : error
            })
        }
        else
        {
            forecast(response, (err, result) => {
                if(err)
                {
                    return res.send({
                        error : error
                    })
                }
                else
                {
                    console.log('----------------------------------------------------------------');
                    console.log(result);
                    console.log('----------------------------------------------------------------');
                    const respo = `${result.weather.condition.text}. It is currently ${result.weather.temp_c}℃ out. It feels like ${result.weather.feelslike_c}℃ out. Humidity is ${result.weather.humidity}%`;
                    res.send({
                        location : req.query.address,
                        place : response.location,
                        latitude: response.latitude,
                        longitude : response.longitude,
                        Forecast :respo,
                        weather : result.weather,
                        locationInfo : result.locationInfo
                    })
                }
            })
        }
    });

    // res.send({
    //     temperature : 40,
    //     location : req.query.address,
    //     humidity : 10,
    //     feelslike : 37
    // })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title : '404 Not Found !!!',
        name : 'Siddharth Patel',
        error : 'About article not found !',
        link : '/about',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404 Not Found !!!',
        name : 'Siddharth Patel',
        error : 'Help article not found !',
        link : '/help',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404 Not Found !!!',
        name : 'Siddharth Patel',
        error : 'Page not found !',
        link : '/',
    })
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})