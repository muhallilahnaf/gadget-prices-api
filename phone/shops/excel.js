const excelBaseUrl = 'https://www.excelestore.com.bd/smartphones?limit=100'

// check pagination excel
const checkPaginationExcel = (doc) => {
    let links = []
    // 1 page gives all phones, so no need to check pagination for now
    return links
}


// parse excel html doc
const parseExcel = (doc) => {
    const products = doc.querySelectorAll('.products-list > div')

    products.forEach(product => {
        let name = ''
        let link = ''
        let price = ''
        let brand = ''

        const a = product.querySelector('h4 a')
        if (a) {
            name = a.textContent.trim()
            const href = a.getAttribute('href')
            if (href) link = href
        }

        const priceNode = product.querySelector('.price-new')
        if (priceNode) {
            price = priceNode.textContent.trim()
        }

        const phone = {
            shop: 'excel', name, link, price, brand
        }
        processResult(phone)
    })
}


// parse html string for excel
const parseTextExcel = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseExcel(doc)
    if (!isSecondary) {
        urls = checkPaginationExcel(doc)
    }
    return urls
}
