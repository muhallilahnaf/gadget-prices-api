const express = require('express')
const { searchGet } = require('./search/main')

const app = express()

app.get('/search', (req, res) => searchGet(req, res))

app.listen(3000)