const salextraBaseUrl = 'https://www.salextra.com.bd/smartphones-mobile#/pageSize=32&orderBy=0&pageNumber=1'

// check pagination salextra
const checkPaginationSalextra = (doc) => {
    const base = 'https://www.salextra.com.bd/smartphones-mobile#/pageSize=32&orderBy=0&pageNumber='
    let links = []

    const nodes = doc.querySelectorAll('li.individual-page')
    if (nodes.length > 0) {
        for (let i = 2; i <= nodes.length + 1; i++) {
            links.push(`${base}${i}`)
        }
    }
    return links
}


// parse salextra html doc
const parseSalextra = (doc) => {
    const products = doc.querySelectorAll('.product-item')

    products.forEach(product => {
        let name = ''
        let link = ''
        let price = ''
        let brand = ''

        const a = product.querySelector('h2.product-title a')
        if (a) {
            name = a.textContent.trim()
            const href = a.getAttribute('href')
            if (href) link = `https://www.salextra.com.bd${href}`
        }

        const priceNode = product.querySelector('.actual-price')
        if (priceNode) {
            price = priceNode.textContent.trim()
        }

        const phone = {
            shop: 'salextra', name, link, price, brand
        }
        if (!salextraLinks.includes(link)) {
            salextraLinks.push(link)
            processResult(phone)
        }
    })
}


// parse html string for salextra
const parseTextSalextra = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseSalextra(doc)
    if (!isSecondary) {
        urls = checkPaginationSalextra(doc)
    }
    return urls
}
