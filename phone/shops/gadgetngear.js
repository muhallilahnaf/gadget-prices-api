const gadgetngearBaseUrl = 'https://gadgetandgear.com/category/phone?sorting=new_arrival'

// check pagination gadgetngear
const checkPaginationGadgetngear = (doc) => {
    let links = []

    const pagination = doc.querySelectorAll('ul.pagination li')
    if (pagination) {
        const pages = pagination.length - 2
        for (let i = 2; i <= pages; i++) {
            links.push(`https://gadgetandgear.com/category/phone?sorting=new_arrival&page=${i}`)            
        }
        links = [...new Set(links)]
    }
    return links
}


// parse gadgetngear html doc
const parseGadgetngear = (doc) => {
    const products = doc.querySelectorAll('.product-list-item')

    products.forEach(product => {
        let name = ''
        let link = ''
        let price = ''
        let brand = ''

        const linkNode = product.querySelector('a')
        if (linkNode) {
            const href = linkNode.getAttribute('href')
            if (href) link = `https://gadgetandgear.com${href}`
        }
        const nameNode = product.querySelector('p.product-name')
        if (nameNode) name = nameNode.textContent.trim()

        const statusNode = product.querySelector('.out-of-stock')
        if (!statusNode) {
            const priceNode = product.querySelector('.product-price')
            if (priceNode) {
                let child = priceNode.firstChild
                let priceTexts = []

                while (child) {
                    if (child.nodeType == 3) priceTexts.push(child.data)
                    child = child.nextSibling
                }

                price = priceTexts.join("").trim()
            }
        }

        const brandNode = product.querySelector('.product-meta p')
        if (brandNode) brand = brandNode.textContent.trim()

        const phone = {
            shop: 'gadgetngear', name, link, price, brand
        }
        processResult(phone)
    })
}


// parse html string for gadgetngear
const parseTextGadgetngear = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseGadgetngear(doc)
    if (!isSecondary) {
        urls = checkPaginationGadgetngear(doc)
    }
    return urls
}
