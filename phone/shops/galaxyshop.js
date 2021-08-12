const galaxyshopBaseUrl = 'http://www.galaxyshopbd.com/'

// check pagination galaxyshop
const checkPaginationGalaxyshop = (doc) => {
    let links = []
    return links
}


// parse galaxyshop html doc
const parseGalaxyshop = (doc) => {
    const products = doc.querySelectorAll('.product-card')

    products.forEach(product => {
        let name = ''
        let link = ''
        let price = ''
        let brand = 'Samsung'

        const linkNode = product.querySelector('.product-title a')
        if (linkNode) {
            const href = linkNode.getAttribute('href')
            if (href) link = `http://www.galaxyshopbd.com${href}`
            name = linkNode.textContent.trim()
        }

        const priceNode = product.querySelector('.product-price')
        if (priceNode) {
            if (priceNode.childNodes.length === 3) {
                price = priceNode.childNodes[2].textContent.trim()
            } else {
                price = priceNode.childNodes[0].textContent.trim()
            }
        }

        const phone = {
            shop: 'galaxyshop', name, link, price, brand
        }
        processResult(phone)
    })
}


// parse html string for galaxyshop
const parseTextGalaxyshop = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseGalaxyshop(doc)
    if (!isSecondary) {
        urls = checkPaginationGalaxyshop(doc)
    }
    return urls
}
