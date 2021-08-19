const express = require('express')
const mongoose = require('mongoose')
const { searchGet } = require('./search/main')
const { url } = require('./db/config')
const phoneRoutes = require('./routes/phone')
const versionRoutes = require('./routes/version')


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

// version routes
versionRoutes(app)

app.get('/search', searchGet)

app.listen(3000)