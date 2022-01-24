const request = require("request")

const geocode  = (address, callback) => {
    const url ="http://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYXl1c2hndXB0YTEzMzIiLCJhIjoiY2t5Z3dkbXhsMXdzejJxcG1qZm1hNzhudyJ9.regW4XMSArAycfL1v9is5g&limit=1"
    request({ url, json: true }, (error, {body}) => {
        if(error) {
          callback("Unable to connect to Location Services!", undefined)
        }
        else if(body.features.length === 0) {
          callback("Unable to find location, Try another search.", undefined)
        }
        else {
          callback(undefined, {
            latitude: body.features[0].center[1],
            Longitude:body.features[0].center[0],
            location: body.features[0].place_name
          })
        }
    })
  }

  module.exports = geocode