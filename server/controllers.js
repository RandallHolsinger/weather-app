const axios = require('axios')
const {WEATHER_API_KEY} = process.env

module.exports = {

    weather: async (req, res) => {
        const {lat, lon} = req.params
        try {
            await axios({
                method: 'GET',
                url: 'https://yahoo-weather5.p.rapidapi.com/weather',
                params: {lat: `${lat}`, long: `${lon}`, format: 'json', u: 'f'},
                headers: {
                  'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com',
                  'X-RapidAPI-Key': `${WEATHER_API_KEY}`
                }
            })
            .then(response => {
                res.send(response.data)
            })
        } catch(err) {
            console.log({errorMessage: `${err}`})
        }
    },

    default: async (req, res) => {
        try {
            await axios({
                method: 'GET',
                url: 'https://yahoo-weather5.p.rapidapi.com/weather',
                params: {lat: '37.773972', long: '-122.431297', format: 'json', u: 'f'},
                headers: {
                  'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com',
                  'X-RapidAPI-Key': `${WEATHER_API_KEY}`
                }
            })
            .then(response => {
                res.send(response.data)
            })
        } catch(err) {
            console.log({errorMessage: `${err}`})
        }
    },

    getCities: async (req, res) => {
        const {input} = req.params
        try {
            await axios({
                method: 'GET',
                url: 'https://spott.p.rapidapi.com/places',
                params: {type: 'CITY', skip: '0', limit: '5', q: `${input}`},
                headers: {
                  'X-RapidAPI-Host': 'spott.p.rapidapi.com',
                  'X-RapidAPI-Key': `${WEATHER_API_KEY}`
                }
            })
            .then(response => {
                res.send(response.data)
            })
        } catch(err) {
            console.log({errorMessage: `${err}`})
        }
    },

    search: async (req, res) => {
        const {city} = req.params
        try {
            await axios({
                method: 'GET',
                url: 'https://yahoo-weather5.p.rapidapi.com/weather',
                params: {location: `${city}`, format: 'json', u: 'f'},
                headers: {
                  'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com',
                  'X-RapidAPI-Key': `${WEATHER_API_KEY}`
                }
            })
            .then(response => {
                res.send(response.data)
            })
        } catch(err) {
            console.log({errorMessage: `${err}`})
        }
    },

    news: async (req, res) => {
        try {
            await axios({
                method: 'GET',
                url: 'https://free-news.p.rapidapi.com/v1/search',
                params: {q: 'Breaking News', lang: 'en'},
                headers: {
                  'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
                  'X-RapidAPI-Key': `${WEATHER_API_KEY}`
                }
            })
            .then(response => {
                res.send(response.data)
            })
        } catch(err) {
            console.log({errorMessage: `${err}`})
        }
    }
}