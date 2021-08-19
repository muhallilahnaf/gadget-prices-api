require("dotenv").config()
const express = require('express')
const dbConnect = require('./db/main')
const searchRoutes = require('./routes/search')
const phoneRoutes = require('./routes/phone')
const versionRoutes = require('./routes/version')
const userRoutes = require('./routes/user')

const app = express()
app.use(express.json())

dbConnect()

searchRoutes(app)
phoneRoutes(app)
versionRoutes(app)
userRoutes(app)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}...`))