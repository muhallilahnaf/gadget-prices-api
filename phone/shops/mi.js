const miBaseUrl = 'https://mi.com/bd'

// check pagination mi
const checkPaginationMi = (doc) => {
    let links = []
    // 1 page gives all phones, so no need to check pagination for now
    return links
}


// parse mi html doc
const parseMi = (doc) => {
    const categories = doc.querySelectorAll('.categories-wrapper .products-exhibit')

    for (let i = 0; i <= 2; i++) {
        const category = categories[i]
        const products = category.querySelectorAll('.main-product')

        for (let i = 0; i < products.length; i++) {
            const product = products[i]
            let name = ''
            let link = ''
            let price = ''
            let brand = 'Xiaomi'

            const a = product.querySelector('a.product-name')
            if (a) {
                name = a.textContent.trim()
                if (name === 'View More') continue
                const href = a.getAttribute('href')
                if (href) link = href
            }

            const priceNode = product.querySelector('.product-price')
            if (priceNode) price = priceNode.textContent.trim()

            const phone = {
                shop: 'mi', name, link, price, brand
            }
            processResult(phone)
        }
    }
}


// parse html string for mi
const parseTextMi = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseMi(doc)
    if (!isSecondary) {
        urls = checkPaginationMi(doc)
    }
    return urls
}
