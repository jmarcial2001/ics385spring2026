// load env file so we can use the API key
require('dotenv').config()

// library to make API request
const axios = require('axios')

// get API key from .env
const apiKey = process.env.OPENWEATHER_API_KEY

// ask user for latitude and longitude
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

// ask for latitude
readline.question("Enter latitude: ", function(lat) {

    // ask for longitude
    readline.question("Enter longitude: ", function(lon) {

        // OpenWeather API link
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

        // send request to API
        axios.get(url)
        .then(function(response) {

            const data = response.data

            // getting info from the API response
            const description = data.weather[0].description
            const temp = data.main.temp
            const icon = data.weather[0].icon
            const humidity = data.main.humidity
            const windSpeed = data.wind.speed
            const cloudiness = data.clouds.all

            console.log("\nCurrent Weather")

            console.log("Description:", description)
            console.log("Temp:", temp)
            console.log("Icon:", icon)
            console.log("Humidity:", humidity)
            console.log("Wind Speed:", windSpeed)
            console.log("Cloudiness:", cloudiness)

        })
        .catch(function(error) {

            // error notes
            console.log("Error:", error.message)

        })

        readline.close()

    })

})
