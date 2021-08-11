// process parsedResults
const processResult = (product) => {
    // price
    let parsedPrice
    let price = product['price']

    if (product['shop'] === 'gadgetngear') {
        parsedPrice = price.replace(/\D+/g, '')
    } else {
        parsedPrice = price.replace(/[^\.\d]+/g, '')
    }
    if (parsedPrice !== '') {
        price = `BDT ${Number.parseInt(parsedPrice).toLocaleString('en-IN')}`
    }

    let shop = ''

    // shop
    switch (product['shop']) {
        case 'pickaboo':
            shop = 'Pickaboo'
            break
        case 'robishop':
            shop = 'Robishop'
            break
        case 'penguinbd':
            shop = 'Penguin BD'
            break
        case 'trendytracker':
            shop = 'Trendy Tracker'
            break
        case 'gadgetngear':
            shop = 'Gadget & Gear'
            break
        default:
            shop = ''
            break
    }
    

    // PUSH DATA
    parsedResults.push({
        ...product,
        price,
        shop
    })
}
