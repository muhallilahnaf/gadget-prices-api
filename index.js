const express = require('express')
const mongoose = require('mongoose')
const { searchGet } = require('./search/main')
const {url} = require('./db/config')
const phoneRoutes = require('./routes/phone')


const app = express()
app.use(express.json())

mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database")
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
})

// phone routes
phoneRoutes(app)

app.get('/search', (req, res) => searchGet(req, res))

app.listen(3000)