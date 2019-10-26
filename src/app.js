const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');

const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);

const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Index HBS',
    name: 'Sang Nguyen'
  })
})

app.get('/about', (req, res) => {
  res.render('index', {
    title: 'About HBS',
    name: 'Sang Nguyen'
  })
})

app.get('/help', (req, res) => {
  res.render('index', {
    title: 'Help HBS',
    name: 'Sang Nguyen'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You need to request the weather of an area with it\'s address'
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data.latitude, data.longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({ forecastError });
      }
      res.send(forecastData);
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('page-404', {
    title: '404 Error Page',
    name: 'Sang Nguyen',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('page-404', {
    title: '404 Error Page',
    name: 'Sang Nguyen',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('The server is up on port 3000, now !');
})