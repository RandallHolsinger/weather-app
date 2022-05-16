const axios = require('axios')
const {WEATHER_API_KEY} = process.env

module.exports = {

    current: async (req, res) => {
        const position = req.body
        console.log('22222', req.body)
        try {
            await axios({
                method: 'GET',
                url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
                params: {lon: '-77.042793', lat: '-12.046374', units: 'imperial', lang: 'en'},
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
}