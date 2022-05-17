const axios = require('axios')
const {WEATHER_API_KEY} = process.env

module.exports = {

    current: async (req, res) => {
        const {lat, lon} = req.params
        try {
            await axios({
                method: 'GET',
                url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
                params: {lon: `${lon}`, lat: `${lat}`, units: 'imperial', lang: 'en'},
                headers: {
                  'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
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

    fiveday: async (req, res) => {
        try {
            await axios({
                method: 'GET',
                url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
                params: {lon: '38.5', lat: '-78.5'},
                headers: {
                  'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
                  'X-RapidAPI-Key': '2081668b64msh13cc62be7f14c36p1bbdb0jsn007f29176bd7'
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