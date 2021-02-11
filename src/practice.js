const path = require('path');

console.log(__filename)

console.log(__dirname)
// location of static file
const publicDirectory = path.join(__dirname,'../public');
console.log(publicDirectory)

// loading express library
// This will return a function
const express = require('express');

const app = express();


//This will load static html file
app.use(express.static(publicDirectory))

// get takes 2 parameter
// First is the route
// Second is callback method where req is request and res is response
// callback method tells express what to do when someone visits this route
// req is incoming request 
// res is the response which we will be sending
// app.get('', (req, res) => {
//     // send method allows us to send something back to the requester
//     res.send('Hello. This is homepage');
// })


// route to help and about are no longer needed since we are loading static html file

// app.get('/help', (req, res) => {
//     res.send({
//         name : 'Siddharth',
//         age : 24
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<div style="">This is about page.</div>')
// })

app.get('/weather', (req, res) => {
    res.send({
        temperature : 40,
        location : 'Jabalpur',
        humidity : 10,
        feelslike : 37
    })
})

// This starts the server and listen to the port mentioned
app.listen(3000, () => {
    console.log('Server is running at port 3000')
})