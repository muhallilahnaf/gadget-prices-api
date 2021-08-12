// filter data
const filterData = (a) => {
    if (a === 'price') {
        parsedResults.forEach(phone => {
            const price = parseInt(phone['price'].replace(/\D/gi, ''))
            if (price >= priceFilter['min'] && price <= priceFilter['max']) {
                filteredResults.push(phone)
            }
        })
    }
}