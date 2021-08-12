// filter data
const filterDataPrice = (allResults, priceMin, priceMax) => {
    return allResults.map(product => {
        const price = parseInt(product['price'].replace(/\D/gi, ''))
        if (price >= priceMin && price <= priceMax) return product
    })
}

module.exports = { filterDataPrice }