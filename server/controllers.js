const axios = require('axios')
const {WEATHER_API_KEY} = process.env

module.exports = {

    weather: async (req, res) => {
        const {lat, lon} = req.params
        console.log('hitting backend Current', lat, lon)
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
}