const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();
const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handelbars engin, views and partials custom path
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Setup public directory 
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Armen Bablanyan',
        image: '/img/11.jpg'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Armen Bablanyan',
        image: '/img/11.jpg'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Page',
        name: 'Armen Bablanyan'
    });
});

// This is for a backend API calls and returns JSON data
app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: 'Address not provided. Please provide address.'
        })
    }

    geocode(req.query.address, (err, {latitude, longitude, place_name, bbox} = {}) => {
        if(err){
            return res.send({
                error: err
            });
        }
        
        const geodataTitle = 'Geodata for given address';
        
        weather(latitude, longitude, (err, weather) => {
            if(err){
                return res.send({
                    error: err
                });
            }
            const weatherTitle = 'Weather for given address';

            res.send({
                    geodata: {latitude, longitude, place_name, bbox},
                    weather,
                });
        });
    });
});


app.get('/weather/*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        error: 'Access denied. Restricted area...'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        error: 'Requested page not found.'
    });
});

app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
});