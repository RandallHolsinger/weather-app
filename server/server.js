require('dotenv').config();
const express = require('express')
const app = express()
const ctrl = require('./controllers')


app.use(express.json())

app.use(express.static( `${__dirname}/../build` ))

const {SERVER_PORT} = process.env

app.listen(SERVER_PORT, () => console.log(`Connected To Server Port: #${SERVER_PORT}`))

//Get Current Weather
app.get('/api/weather/location/:lat/:lon/:unit', ctrl.weather)

//Get Default weather without location services
app.get('/api/weather/location/default/:unit', ctrl.default)

//Get Cities List
app.get('/api/cities/:input', ctrl.getCities)

//Get Searched Weather
app.get('/api/weather/location/:city/:unit', ctrl.search)

//Get News
app.get('/api/news/', ctrl.news)

//Send Html File

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
