// -----------------------------------------
// Weather App on the Web
// -----------------------------------------

// Prerequisites
// - - - - - - - - - - - - - - - - - - - - -

// Path
const path = require('path')
const hbs = require('hbs')

// Setup express
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Include the required weather and geocode modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express configuration
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDir))

// Pages / Gets
// - - - - - - - - - - - - - - - - - - - - -

// Home
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
})

// About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

// Help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'Want some help? Me too...'
    })
})

// Weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } 
        forecast(latitude, longitude, (error, {currentTemp, currentFeel, currentDesc, currentHumi}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: "It's currently " + currentDesc + ' with a temperature of ' + currentTemp + 'C and a real feel of ' + currentFeel + 'C. Current humidity is ' + currentHumi + '%.'
            })
        })
    })
})

// Help 404
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Sorry, that help page could not be found'
    })
})

// Other 404
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Page not found'
    })
})

// Port listening
app.listen(port, () => {
    console.log('Server running - listening on port ' + port + '.')
})