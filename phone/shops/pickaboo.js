const pickabooBaseUrls = [
    'https://www.pickaboo.com/smartphone/motorola.html?product_list_limit=80',
    'https://www.pickaboo.com/smartphone/iphone.html?product_list_limit=80',
    'https://www.pickaboo.com/smartphone/vivo.html?product_list_limit=80',
    'https://www.pickaboo.com/smartphone/oppo.html?product_list_limit=80',
    'https://www.pickaboo.com/smartphone/realme.html?product_list_limit=80',
    'https://www.pickaboo.com/smartphone/samsung.html?product_list_limit=80',
    'https://www.pickaboo.com/smartphone/xiaomi.html?product_list_limit=80',
    'https://www.pickaboo.com/mobile-phone/smartphone/tecno.html?product_list_limit=80',
    'https://www.pickaboo.com/smartphone/infinix.html?product_list_limit=80',
]

// check pagination pickaboo
const checkPaginationPickaboo = (doc) => {
    let links = []
    // 1 page gives 80 phones, so no need to check pagination for now
    return links
}


// parse pickaboo html doc
const parsePickaboo = (doc) => {
    const products = doc.querySelectorAll('li.product-item')

    products.forEach(product => {
        let name = ''
        let link = ''
        let price = ''
        let brand = ''

        const a = product.querySelector('a.product-item-link')
        if (a) {
            name = a.textContent.trim()
            const href = a.getAttribute('href')
            if (href) link = href
        }

        const priceNode = product.querySelector('[data-price-type=finalPrice]')
        if (priceNode) price = priceNode.getAttribute('data-price-amount')

        const phone = {
            shop: 'pickaboo', name, link, price, brand
        }
        processResult(phone)
    })
}


// parse html string for pickaboo
const parseTextPickaboo = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parsePickaboo(doc)
    if (!isSecondary) {
        urls = checkPaginationPickaboo(doc)
    }
    return urls
}
