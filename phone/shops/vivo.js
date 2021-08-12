const vivoBaseUrl = 'https://www.vivo.com/bd/products'

// check pagination vivo
const checkPaginationVivo = (doc) => {
    let links = []
    // 1 page gives all phones, so no need to check pagination for now
    return links
}


// parse vivo html doc
const parseVivo = (doc) => {
    const products = doc.querySelectorAll('div.pro_in_filter-con.clearafter > a[title]')

    products.forEach(product => {
        let name = ''
        let link = ''
        let price = ''
        let brand = 'Vivo'

        const title = product.getAttribute('title')
        if (title) name = title
        const href = product.getAttribute('href')
        if (href) link = `https://www.vivo.com${href}`

        const priceNode = product.querySelector('.sale-price')
        if (priceNode) price = priceNode.textContent.trim()

        const phone = {
            shop: 'vivo', name, link, price, brand
        }
        processResult(phone)
    })
}


// parse html string for vivo
const parseTextVivo = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseVivo(doc)
    if (!isSecondary) {
        urls = checkPaginationVivo(doc)
    }
    return urls
}
