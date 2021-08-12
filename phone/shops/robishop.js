const robishopBaseUrl = 'https://robishop.com.bd/mobile-phones.html'

// check pagination robishop
const checkPaginationRobishop = (doc) => {
    let links = []
    // 1 page gives all phones, so no need to check pagination for now
    return links
}


// parse robishop html doc
const parseRobishop = (doc) => {
    const products = doc.querySelectorAll('.product-listing .product')

    products.forEach(product => {
        let name = ''
        let link = ''
        let price = ''
        let brand = ''

        const a = product.querySelector('a.product-link')
        if (a) {
            const href = a.getAttribute('href')
            if (href) link = `https://robishop.com.bd${href}`
            const nameNode = a.querySelector('p[title]')
            if (nameNode) name = nameNode.textContent.trim()
        }

        const priceNode = product.querySelector('.price-section')
        if (priceNode) price = priceNode.textContent.trim()

        const phone = {
            shop: 'robishop', name, link, price, brand
        }
        processResult(phone)
    })
}


// parse html string for robishop
const parseTextRobishop = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseRobishop(doc)
    if (!isSecondary) {
        urls = checkPaginationRobishop(doc)
    }
    return urls
}
