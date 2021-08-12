const darazBaseUrl = 'https://www.daraz.com.bd/smartphones'

// check pagination daraz
const checkPaginationDaraz = (doc) => {
    let links = []
    // fetched through ajax
    return links
}


// parse daraz html doc
const parseDaraz = (phones) => {
    phones.forEach(p => {
        let name = ''
        let link = ''
        let price = ''
        let brand = ''
        let status = ''

        if (p.name) {
            name = p.name
        }

        if (p.productUrl) {
            const start = p.productUrl.indexOf('www')
            const end = p.productUrl.indexOf('.html') + 5
            link = `https://${p.productUrl.slice(start, end)}`
        }

        if (p.price) {
            price = p.price
        }

        if (p.brandName) {
            brand = p.brandName
        }

        if (p.inStock) {
            status = p.inStock
        }

        const phone = {
            shop: 'daraz', name, link, price, brand, status
        }
        processResult(phone)
    })
}


// parse html string for daraz
const parseTextDaraz = (text, isSecondary) => {
    let urls = []
    let phones = []
    let links = []

    const doc = parser.parseFromString(text, 'text/html')
    const scripts = doc.querySelectorAll('script')
    scripts.forEach(script => {
        const text = script.textContent
        if (text.includes('window.pageData')) {
            const start = text.indexOf('{')
            const dataText = text.slice(start, text.length)
            const data = JSON.parse(dataText)
            phones.push(...data.mods.listItems)

            // const totalResults = parseInt(data.mainInfo['totalResults'])
            // const pageSize = parseInt(data.mainInfo['pageSize'])
            // if (!isNaN(totalResults) && !isNaN(pageSize)) {
            //     const pages = Math.ceil(totalResults / pageSize)
            //     for (let i = 2; i <= pages; i++) {
            //         links.push(`${darazBaseUrl}/?ajax=true&page=${i}`)
            //     }
            // }
            // console.log(links)
            // if (links.length > 0) {
            //     let promises = getFetchs(links)
            //     Promise.all(promises).then(responses => {
            //         let promiseDicts = []
            //         responses.forEach(response => {
            //             if (response.status === 200) {
            //                 promiseDicts.push(response.json())
            //             } else {
            //                 console.log(response.status, response.statusText)
            //             }
            //         })
            //         Promise.all(promiseDicts).then(dicts => {
            //             dicts.forEach(dict => { phones.push(dict.mods.listItems) })
            //         }).catch(er => console.log(er))
            //     }).catch(e => console.log(e))
            // }
        }
    })
    parseDaraz(phones)
    if (!isSecondary) {
        urls = checkPaginationDaraz(doc)
    }
    return urls
}
