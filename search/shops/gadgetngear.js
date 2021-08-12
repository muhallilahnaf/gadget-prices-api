const { JSDOM } = require("jsdom")

// check pagination gadgetngear
const checkPaginationGadgetngear = (doc, formData) => {
    let links = []

    const pagination = doc.querySelectorAll('ul.pagination li')
    if (pagination) {
        const pages = pagination.length - 2
        for (let i = 2; i <= pages; i++) {
            links.push(`${getGadgetngearUrl(formData.q)}&page=${i}`)
        }
        links = [...new Set(links)]
    }
    return links
}


// parse gadgetngear html doc
const parseGadgetngear = (doc) => {
    const products = doc.querySelectorAll('.product-list-item')

    let results = []

    products.forEach(product => {
        let name = ''
        let link = ''
        let price = ''
        let brand = ''
        let status = ''

        const linkNode = product.querySelector('a')
        if (linkNode) {
            const href = linkNode.getAttribute('href')
            if (href) link = `https://gadgetandgear.com${href}`
        }
        const nameNode = product.querySelector('p.product-name')
        if (nameNode) name = nameNode.textContent.trim()

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

        const brandNode = product.querySelector('.product-meta p')
        if (brandNode) brand = brandNode.textContent.trim()

        const statusNode = product.querySelector('.out-of-stock')
        status = statusNode ? 'out of stock' : 'in stock'

        const item = {
            shop: 'gadgetngear', name, link, price, brand, status
        }

        console.log(item)

        results.push(item)
    })
    return results
}


// generate gadgetngear url
const getGadgetngearUrl = (q) => {
    return `https://gadgetandgear.com/search?keyword=${q}&sorting=new_arrival`
}


// parse html string for gadgetngear
const parseTextGadgetngear = (text, isSecondary, formData) => {
    let links = []
    const { document } = new JSDOM(text).window
    const results = parseGadgetngear(document)
    if (!isSecondary) {
        links = checkPaginationGadgetngear(document, formData)
    }
    return { links, results }
}


module.exports = { getGadgetngearUrl, parseTextGadgetngear }