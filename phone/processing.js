// process parsedResults
const processResult = (phone) => {

    // specs
    let phoneRawname = phone['name'].replace(/\./g, '').replace(/'/g, '').replace(/-/g, '').replace(/\*/g, '')
    phoneRawname = phoneRawname.replace(/\(.*GB.*\)|\(.*\+.*\)|\(.*\/.*\)/g, '') // (4GB 64GB) (4+64) (4/64)
    phoneRawname = phoneRawname.replace(/\d+[G]?[B]?\+\d+[G]?[B]?/g, '') // 4GB+64GB
    phoneRawname = phoneRawname.replace(/\d+[G]?[B]?\/\d+[G]?[B]?.*/g, '') // 4GB/64GB
    phoneRawname = phoneRawname.replace(/\d+GB.*/g, '') // 4GB+64GB with free earbuds
    phoneRawname = phoneRawname.replace(/\|.*/g, '') // | Aqua Black
    phoneRawname = phoneRawname.replace(/\s/g, '').toLowerCase()

    // name
    if (phoneRawname.includes('galaxy') && !phoneRawname.includes('samsung')) {
        phone['name'] = phone['name'].replace(/galaxy/gi, 'Samsung Galaxy')
        phoneRawname = phoneRawname.replace(/galaxy/gi, 'samsunggalaxy')
    }
    if (phoneRawname.includes('samsung') && !phoneRawname.includes('galaxy')) {
        phone['name'] = phone['name'].replace(/samsung/gi, 'Samsung Galaxy')
        phoneRawname = phoneRawname.replace(/samsung/gi, 'samsunggalaxy')
    }
    if (phoneRawname.includes('motorola') && !phoneRawname.includes('motorolamoto')) {
        phone['name'] = phone['name'].replace(/motorola/gi, 'Motorola Moto')
        phoneRawname = phoneRawname.replace(/motorola/gi, 'motorolamoto')
    }
    if (phoneRawname.includes('iphone') && !phoneRawname.includes('apple')) {
        phone['name'] = `Apple ${phone['name']}`
        phoneRawname = `apple${phoneRawname}`
    }
    if (phoneRawname.includes('poco') && !phoneRawname.includes('xiaomi')) {
        phone['name'] = `Xiaomi ${phone['name']}`
        phoneRawname = `xiaomi${phoneRawname}`
    }
    if (phoneRawname.includes('redmi') && !phoneRawname.includes('xiaomi')) {
        phone['name'] = `Xiaomi ${phone['name']}`
        phoneRawname = `xiaomi${phoneRawname}`
    }
    if (phone['name'].includes('Mi') && !phoneRawname.includes('xiaomi') && !phoneRawname.includes('micromax')) {
        phone['name'] = `Xiaomi ${phone['name']}`
        phoneRawname = `xiaomi${phoneRawname}`
    }
    if (phone['shop'] === 'vivo') {
        phone['name'] = `Vivo ${phone['name']}`
        phoneRawname = `vivo${phoneRawname}`
    }


    let match = {
        name: '',
        date: '',
        height: '',
        thiccness: '',
        weight: '',
        sim: '',
        body: '',
        display: '',
        displaysize: '',
        displayres: '',
        displayppi: '',
        displayprotecc: '',
        os: '',
        chipset: '',
        memoryslot: '',
        memory: '',
        memoryspeed: '',
        rearcam: '',
        rearvideo: '',
        rearvideostable: '',
        frontcam: '',
        frontvideo: '',
        frontvideostable: '',
        charging: '',
        hpjack: '',
        wlan: '',
        bluetooth: '',
        usb: '',
        sensors: '',
        fingerprint: '',
        battery: '',
        antutuv8: '',
        'geekbench5.1': '',
        rawname: '',
        geekbench: '',
        chipsetdetails: '',
        link: '',
        brand: ''
    }

    phones.some(p => {
        if (p['rawname'].replace(/\(.+\)/g, '') === phoneRawname) {
            match = {
                ...match,
                ...p
            }
            return true
        }
    })

    // price
    let parsedPrice
    let price = phone['price']
    if (phone['shop'] === 'realme' || phone['shop'] === 'fdl' || phone['shop'] === 'gadgetngear') {
        parsedPrice = price.replace(/\D+/g, '')
    } else {
        parsedPrice = price.replace(/[^\.\d]+/g, '')
    }
    if (parsedPrice !== '') {
        price = `BDT ${Number.parseInt(parsedPrice).toLocaleString('en-IN')}`
    }

    // brand
    if (match['name'] !== '' && phone['brand'] === '') {
        const brand = match['name'].split(' ')[0].toLowerCase()
        brands.some(b => {
            if (brand === b.toLowerCase()) {
                match['brand'] = b
                return true
            }
        })
    } else {
        match['brand'] = phone['brand']
    }

    // shop
    switch (phone['shop']) {
        case 'daraz':
            match['shop'] = 'Daraz'
            break
        case 'excel':
            match['shop'] = 'Excel e-store'
            break
        case 'fdl':
            match['shop'] = 'FDL'
            break
        case 'galaxyshop':
            match['shop'] = 'Galaxyshop BD'
            break
        case 'mi':
            match['shop'] = 'mi store'
            break
        case 'oppo':
            match['shop'] = 'opposhop'
            break
        case 'pickaboo':
            match['shop'] = 'Pickaboo'
            break
        case 'realme':
            match['shop'] = 'realme'
            break
        case 'robishop':
            match['shop'] = 'Robishop'
            break
        case 'salextra':
            match['shop'] = 'Salextra'
            break
        case 'transcom':
            match['shop'] = 'Transcom Digital'
            break
        case 'vivo':
            match['shop'] = 'vivo'
            break
        case 'gadgetngear':
            match['shop'] = 'Gadget & Gear'
            break
        default:
            match['shop'] = ''
            break
    }

    // PUSH DATA
    parsedResults.push({
        ...match,
        name: phone['name'],
        link: phone['link'],
        price,
    })
}
