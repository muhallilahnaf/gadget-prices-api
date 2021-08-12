

// sort data
const sortData = (allResults, sort, order) => {
    if (sort === 'price') {
        return sortDataPrice(allResults, order)
    }
}


// sort by price
const sortDataPrice = (allResults, order) => {

    return allResults.sort((a, b) => {
        const priceStrA = a['price'].replace(/\D+/g, '')
        const priceStrB = b['price'].replace(/\D+/g, '')
        if (priceStrA === '' && priceStrB === '') return 0
        if (priceStrA === '') return 1
        if (priceStrB === '') return -1
        if (order === 'asc') return Number.parseInt(priceStrA) - Number.parseInt(priceStrB)
        return Number.parseInt(priceStrB) - Number.parseInt(priceStrA)
    })
}

module.exports = { sortData }