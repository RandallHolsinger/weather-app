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

    search: async (req, res) => {
        const {search} = req.params
        try {
            await axios({
                method: 'GET',
                url: 'https://yahoo-weather5.p.rapidapi.com/weather',
                params: {location: `${search}`, format: 'json', u: 'f'},
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
    }
}