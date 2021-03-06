const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Ayush Gupta"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Ayush Gupta"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        help: "This is a Help Message",
        title: "Help",
        name: "Ayush Gupta"
    })
})

// app.get("/help", (req, res) => {
//   res.send({
//       name: "Ayush Gupta",
//       age: 26
//   })
// })

// app.get("/about", (req, res) => {
//    res.send("<h1>Designed by Ayush Gupta.</h1>")
// })

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide the address"
        })
    }
    geocode(req.query.address, (error, { location, latitude, Longitude } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, Longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("error", {
        message: "Help article not found",
        title: "404",
        name: "Ayush Gupta"
    })
})

app.get("*", (req, res) => {
    res.render("error", {
        message: "Page not found",
        title: "404",
        name: "Ayush Gupta"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})