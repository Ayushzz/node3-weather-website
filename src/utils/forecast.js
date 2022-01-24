const request = require("request")

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3908de7b8494f2ca826e10e0304b2a6b&query=" + lat + "," + long + "&units=m"
    request({ url, json: true}, (error, { body }) => {
      if(error) {
        callback("Unable to connect to Weather Services!", undefined)
      }
      else if(body.error) {
        callback("Unable to find Location.", undefined)
      }
      else {
        callback(undefined, {
          weatherDesc: body.current.weather_descriptions,
          temperature: body.current.temperature,
          feelsLike:   body.current.feelslike
        })
      }
    })
  }

  module.exports = forecast