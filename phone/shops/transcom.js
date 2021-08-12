const transcomBaseUrl = 'https://transcomdigital.com/smart-phones-price-in-bangladesh?pagesize=24&orderby=15'

// check pagination transcom
const checkPaginationTranscom = (doc) => {
    let links = []

    const pagination = doc.querySelector('div.pager')
    if (pagination) {
        const nodes = pagination.querySelectorAll('li.individual-page a')
        if (nodes.length > 0) {
            nodes.forEach(n => {
                const link = n.getAttribute('href')
                if (link) links.push(`https://transcomdigital.com/${link}`)
            })
            links = [...new Set(links)]
        }
    }
    return links
}


// parse transcom html doc
const parseTranscom = (doc) => {
    const products = doc.querySelectorAll('.item-grid li.item-box')

    products.forEach(product => {
        let name = ''
        let link = ''
        let price = ''
        let brand = ''

        const linkNode = product.querySelector('.product-items a')
        if (linkNode) {
            const href = linkNode.getAttribute('href')
            if (href) link = `https://transcomdigital.com/${href}`
        }
        const nameNode = product.querySelector('p.product-name')
        if (nameNode) name = nameNode.textContent.trim()


        const priceNode = product.querySelector('.regular-price')
        if (priceNode) price = priceNode.textContent.trim()

        const phone = {
            shop: 'transcom', name, link, price, brand
        }
        processResult(phone)
    })
}


// parse html string for transcom
const parseTextTranscom = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseTranscom(doc)
    if (!isSecondary) {
        urls = checkPaginationTranscom(doc)
    }
    return urls
}
