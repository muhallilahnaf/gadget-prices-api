const { primaryFetch } = require('./fetch')
const { processResults } = require('./processing')

// input validation
const validation = (q, shops) => {
    if (q.value === '') return false
    if (shops.length === 0) return false
    return { q, shops }
}


// get /search
const searchGet = (req, res) => {
    const q = req.query.q
    const shop = req.query.shop
    if (!q || !shop) return res.send('error')
    const shops = typeof shop === 'string' ? [shop] : shop

    const formData = validation(q, shops)
    if (formData) {

        console.log(JSON.stringify(formData))

        primaryFetch(formData).then(allResults => {
            console.log(allResults.length)
            const finalResults = processResults(allResults)
            res.send(JSON.stringify(finalResults, null, 4))
        }).catch(e => console.log(e))
    }
}

module.exports = { searchGet }
