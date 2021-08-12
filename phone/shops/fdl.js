const fdlBaseUrl = 'https://estorefdl.com.bd/shop/mobile-wearables/mobiles.html?limit=all'

// check pagination fdl
const checkPaginationFdl = (doc) => {
    let links = []
    // 1 page gives all phones, so no need to check pagination for now
    return links
}


// parse fdl html doc
const parseFdl = (doc) => {
    const products = doc.querySelectorAll('ul.products-grid li.item')

    products.forEach(product => {
        let name = ''
        let link = ''
        let price = ''
        let brand = 'Samsung'

        const a = product.querySelector('h2.product-name a')
        if (a) {
            name = a.textContent.trim()
            const href = a.getAttribute('href')
            if (href) link = href
        }

        const priceSpecialNode = product.querySelector('.special-price .price')
        if (priceSpecialNode) {
            price = priceSpecialNode.textContent.trim()
        } else {
            const priceRegularNode = product.querySelector('.regular-price .price')
            if (priceRegularNode) {
                price = priceRegularNode.textContent.trim()
            }
        }

        const phone = {
            shop: 'fdl', name, link, price, brand
        }
        processResult(phone)
    })
}


// parse html string for fdl
const parseTextFdl = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseFdl(doc)
    if (!isSecondary) {
        urls = checkPaginationFdl(doc)
    }
    return urls
}
