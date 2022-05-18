require('dotenv').config();
const express = require('express')
const app = express()
const ctrl = require('./controllers')


app.use(express.json())

const {SERVER_PORT} = process.env

app.listen(SERVER_PORT, () => console.log(`Connected To Server Port ${SERVER_PORT}`))

//Get Current Weather

app.get('/api/weather/current/location/:lat/:lon', ctrl.current)

app.get('/api/weather/fiveday/location/:lat/:lon', ctrl.fiveday)

// app.get('/api/weather/sixteenday/location/:lat/:lon', ctrl.sixteenday)
