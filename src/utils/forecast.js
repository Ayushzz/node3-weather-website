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
        callback(undefined, body.current.weather_descriptions + ".It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out. The humidity is " + body.current.humidity + "%." 
          
        )
      }
    })
  }

  module.exports = forecast