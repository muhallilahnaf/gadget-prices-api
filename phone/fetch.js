// get array of fetch promises
const getFetchs = (urls) => {
    // console.log(urls)
    return urls.map(url => fetch(proxy + url, {
        headers: headers,
        referrer: ''
    }))
}


// process responses
const processResponses = (responses, isSecondary) => {
    let urls = []
    let resDict = {
        'www.daraz.com.bd': [],
        'estorefdl.com.bd': [],
        'www.pickaboo.com': [],
        'robishop.com.bd': [],
        'transcomdigital.com': [],
        'www.excelestore.com.bd': [],
        'www.salextra.com.bd': [],
        'www.galaxyshopbd.com': [],
        'opposhop.online': [],
        'vivo.com': [],
        'www.realme.com': [],
        'mi.com/bd': [],
        'gadgetandgear.com': []
    }
    let promiseArrArr = []
    let arrPosTracker = {}

    responses.forEach(response => {
        if (response.status === 200) {
            for (const [key, value] of Object.entries(resDict)) {
                if (response.url.includes(key)) resDict[key].push(response.text())
            }
        } else {
            // console.log(response.status, response.statusText)
        }
    })

    for (const [key, value] of Object.entries(resDict)) {
        if (value.length > 0) {
            promiseArrArr.push(value)
            arrPosTracker[key] = promiseArrArr.length - 1
        }
    }

    const biggerPromise = Promise.all(promiseArrArr.map(arr => Promise.all(arr)))

    biggerPromise.then(resultArrArr => {

        for (const [key, value] of Object.entries(arrPosTracker)) {
            if (key === 'www.daraz.com.bd') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextDaraz(text, isSecondary))
                })
            }
            if (key === 'estorefdl.com.bd') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextFdl(text, isSecondary))
                })
            }
            if (key === 'opposhop.online') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextOppo(text, isSecondary))
                })
            }
            if (key === 'www.realme.com') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextRealme(text, isSecondary))
                })
            }
            if (key === 'robishop.com.bd') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextRobishop(text, isSecondary))
                })
            }
            if (key === 'transcomdigital.com') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextTranscom(text, isSecondary))
                })
            }
            if (key === 'vivo.com') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextVivo(text, isSecondary))
                })
            }
            if (key === 'mi.com/bd') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextMi(text, isSecondary))
                })
            }
            if (key === 'www.excelestore.com.bd') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextExcel(text, isSecondary))
                })
            }
            if (key === 'www.salextra.com.bd') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextSalextra(text, isSecondary))
                })
            }
            if (key === 'www.pickaboo.com') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextPickaboo(text, isSecondary))
                })
            }
            if (key === 'www.galaxyshopbd.com') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextGalaxyshop(text, isSecondary))
                })
            }
            if (key === 'gadgetandgear.com') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextGadgetngear(text, isSecondary))
                })
            }
        }

        if (!isSecondary && urls.length > 0) {
            secondaryFetch(urls)
        } else {
            // console.log(parsedResults)
            fetchEnd()
        }
    }).catch(e => console.log(e))
}


// secondary fetch
const secondaryFetch = (urls) => {
    // console.log('secondary');
    let secondaryPromises = getFetchs(urls)
    Promise.all(secondaryPromises).then(responses => {
        processResponses(responses, true)
    }).catch(e => console.log(e))
}


// primary fetch
const primaryFetch = (data) => {
    let urls = []
    data.shops.forEach(shop => {
        switch (shop) {
            case 'daraz':
                urls.push(darazBaseUrl)
                break
            case 'fdl':
                urls.push(fdlBaseUrl)
                break
            case 'oppo':
                urls.push(oppoBaseUrl)
                break
            case 'realme':
                urls.push(realmeBaseUrl)
                break
            case 'robishop':
                urls.push(robishopBaseUrl)
                break
            case 'transcom':
                urls.push(transcomBaseUrl)
                break
            case 'vivo':
                urls.push(vivoBaseUrl)
                break
            case 'mi':
                urls.push(miBaseUrl)
                break
            case 'excel':
                urls.push(excelBaseUrl)
                break
            case 'salextra':
                urls.push(salextraBaseUrl)
                break
            case 'pickaboo':
                urls.push(...pickabooBaseUrls)
                break
            case 'galaxyshop':
                urls.push(galaxyshopBaseUrl)
                break
            case 'gadgetngear':
                urls.push(gadgetngearBaseUrl)
                break
            default:
                break
        }
    })

    let primaryPromises = getFetchs(urls)
    Promise.all(primaryPromises).then(responses => {
        processResponses(responses, false)
    }).catch(e => console.log(e))
}
