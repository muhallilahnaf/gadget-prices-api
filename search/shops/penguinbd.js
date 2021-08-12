
// check pagination penguinbd
const checkPaginationPenguinbd = (text, formData) => {
    let links = []
    // fetched through ajax
    return links
}


// parse penguinbd html doc
const parsePenguinbd = (text) => {
    const start = text.indexOf('{')
    const end = text.lastIndexOf(')')
    const dataText = text.slice(start, end)
    const data = JSON.parse(dataText)

    let results = []

    const products = data['items']
    if (products) {
        products.forEach(p => {
            let name = ''
            let link = ''
            let price = ''
            let brand = ''
            let status = ''

            if (p['title']) {
                name = p['title']
            }

            if (p['link']) {
                link = p['link']
            }

            if (p['price']) {
                price = p['price']
            }

            const product = {
                shop: 'penguinbd', name, link, price, brand, status
            }
            results.push(product)
        })

    }
    return results
}


// generate penguinbd url
const getPenguinbdUrl = (q) => {
    return `https://www.searchanise.com/getresults?api_key=2H0I8m8z4g&q=${q}&sortBy=relevance&sortOrder=desc&restrictBy%5Bvisibility%5D=visible%7Ccatalog%7Csearch&restrictBy%5Bstatus%5D=publish&restrictBy%5Busergroup_ids%5D=guest&startIndex=0&maxResults=100&items=true&pages=true&categories=true&suggestions=true&queryCorrection=true&suggestionsMaxResults=3&pageStartIndex=0&pagesMaxResults=0&categoryStartIndex=0&categoriesMaxResults=0&facets=true&facetsShowUnavailableOptions=false&ResultsTitleStrings=2&ResultsDescriptionStrings=0&displaySubcatProducts=&output=jsonp&callback=jQuery22405162943794999766_1628086367363&_=1628086367364`
}


// parse html string for penguinbd
const parseTextPenguinbd = (text, isSecondary, formData) => {
    let links = []

    const results = parsePenguinbd(text)
    if (!isSecondary) {
        links = checkPaginationPenguinbd(text, formData)
    }
    return { links, results }
}

module.exports = { getPenguinbdUrl, parseTextPenguinbd }