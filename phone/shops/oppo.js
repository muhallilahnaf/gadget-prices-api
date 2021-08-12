const oppoBaseUrl = 'https://opposhop.online/'

// check pagination oppo
const checkPaginationOppo = (doc) => {
    let links = []
    // 1 page gives all phones, so no need to check pagination for now
    return links
}


// parse oppo html doc
const parseOppo = (doc) => {
    const products = doc.querySelectorAll('.product-grid')

    products.forEach(product => {
        let name = ''
        let link = ''
        let price = ''
        let brand = 'Oppo'

        const a = product.querySelector('.detl a')
        if (a) {
            name = a.textContent.trim()
            const href = a.getAttribute('href')
            if (href) link = `https://opposhop.online${href}`
        }

        const priceNode = product.querySelector('.price')
        if (priceNode) price = priceNode.textContent.trim()

        const phone = {
            shop: 'oppo', name, link, price, brand
        }
        processResult(phone)
    })
}


// parse html string for oppo
const parseTextOppo = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseOppo(doc)
    if (!isSecondary) {
        urls = checkPaginationOppo(doc)
    }
    return urls
}
