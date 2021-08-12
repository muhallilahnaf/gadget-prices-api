//  check sort input
const sortValidate = () => {
    sortByError.textContent = ''

    let checkedValue
    sortValues.some(val => {
        if (sortBy.value === val) {
            checkedValue = val
            return true
        }
    })
    if (checkedValue) return checkedValue
    sortByError.textContent = 'select one'
    return false
}


// sort data
const sortData = (checkedValue) => {
    if (checkedValue.includes('price')) sortDataPrice(checkedValue)
    if (checkedValue.includes('antutu')) sortDataAntutu(checkedValue)
}


// sort by price
const sortDataPrice = (checkedValue) => {
    let arr = filteredResults.length == 0 ? parsedResults : filteredResults

    arr = arr.sort((a, b) => {
        const priceStrA = a['price'].replace(/\D+/g, '')
        const priceStrB = b['price'].replace(/\D+/g, '')
        if (priceStrA === '' && priceStrB === '') return 0
        if (priceStrA === '') return 1
        if (priceStrB === '') return -1
        if (checkedValue.includes('asc')) return Number.parseInt(priceStrA) - Number.parseInt(priceStrB)
        return Number.parseInt(priceStrB) - Number.parseInt(priceStrA)
    })

    if (filteredResults.length == 0) {
        parsedResults = arr
    } else {
        filteredResults = arr
    }
}


// sort by antutu score
const sortDataAntutu = (checkedValue) => {
    let arr = filteredResults.length == 0 ? parsedResults : filteredResults

    arr = arr.sort((a, b) => {
        const antutuA = a['antutuv8']
        const antutuB = b['antutuv8']
        if (antutuA === '' && antutuB === '') return 0
        if (antutuA === '') return 1
        if (antutuB === '') return -1
        if (checkedValue.includes('asc')) return Number.parseInt(antutuA) - Number.parseInt(antutuB)
        return Number.parseInt(antutuB) - Number.parseInt(antutuA)
    })

    if (filteredResults.length == 0) {
        parsedResults = arr
    } else {
        filteredResults = arr
    }
}
