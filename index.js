const express = require('express')
const { validation } = require('./search/main')
const { primaryFetch } = require('./search/fetch')

const app = express()

app.get('/search', async (req, res) => {
    const q = req.query.q
    const shop = req.query.shop
    if (!q || !shop) return res.send('error')
    const shops = typeof shop === 'string' ? [shop] : shop

    const formData = validation(q, shops)
    if (formData) {
        console.log(JSON.stringify(formData))
        const allResults = await primaryFetch(formData)
        console.log(allResults.length)
        res.send(JSON.stringify(allResults))
    }
})

app.listen(3000)