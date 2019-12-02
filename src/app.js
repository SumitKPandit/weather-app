const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sumit Kumar Pandit'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sumit Kumar Pandit'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sumit Kumar Pandit'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    };

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error });
        }; 
        forecast(latitude, longitude, (error, response) => {
            if(error) {
                return res.send({ error });
            };
            res.send({
                forecast: response,
                location: location,
                address: req.query.address
            });
        });
    });

    // res.send({
    //     address: req.query.address,
    //     location: 'Bengaluru, Karnataka, India',
    //     forecast: 'Possible light rain in the evening. It is currently 24.95 degrees out. There is a 33% chance of rain.'
    // });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    };

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sumit Kumar Pandit',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sumit Kumar Pandit',
        errorMessage: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port + '...');
});