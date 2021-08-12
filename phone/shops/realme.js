const realmeBaseUrl = 'https://www.realme.com/bd/'

// check pagination realme
const checkPaginationRealme = (doc) => {
    let links = []
    // 1 page gives all phones, so no need to check pagination for now
    return links
}


// parse realme html doc
const parseRealme = (doc) => {
    const firstProducts = doc.querySelector('.product-content')
    const products = firstProducts.querySelectorAll('a.plate-primary')

    products.forEach(product => {
        let name = ''
        let link = ''
        let price = ''
        let brand = 'realme'

        const href = product.getAttribute('href')
        if (href) {
            link = href
            name = href.replace('https://www.realme.com/bd/', '').replace('-', ' ').trim()
        }

        const priceNode = product.querySelector('.plate-primary-price span.font-bold')
        if (priceNode) price = priceNode.textContent.trim()

        const phone = {
            shop: 'realme', name, link, price, brand
        }
        processResult(phone)
    })
}


// parse html string for realme
const parseTextRealme = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseRealme(doc)
    if (!isSecondary) {
        urls = checkPaginationRealme(doc)
    }
    return urls
}
