const { primaryFetch } = require('../search/fetch')
const { processResults } = require('../search/processing')
const { sortData } = require('../search/sort')
const { filterDataPrice } = require('../search/filter')

// input validation
const validation = (q, shops) => {
    if (q.value === '') return false
    if (shops.length === 0) return false
    return { q, shops }
}


// get /search
module.exports = (req, res) => {
    const q = req.query.q
    const shop = req.query.shop
    const sort = req.query.sort
    const order = req.query.order
    const priceMin = req.query.priceMin
    const priceMax = req.query.priceMax
    if (!q || !shop) return res.send('error')
    if ((sort && !order) || (!sort && order)) return res.send('error')
    if ((priceMin && !priceMax) || (!priceMin && priceMax)) return res.send('error')
    const shops = typeof shop === 'string' ? [shop] : shop
    const formData = validation(q, shops)
    if (formData) {
        console.log(JSON.stringify(formData))
        primaryFetch(formData).then(allResults => {
            console.log(allResults.length)
            let finalResults = processResults(allResults)
            if (sort && order) finalResults = sortData(finalResults, sort, order)
            if (priceMin && priceMax) finalResults = filterDataPrice(finalResults, priceMin, priceMax)
            return res.send(JSON.stringify(finalResults, null, 4))
        }).catch(err => res.send(err.message))
    }
}
