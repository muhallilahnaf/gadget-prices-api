const fetch = require('node-fetch')

const { getGadgetngearUrl, parseTextGadgetngear } = require('./shops/gadgetngear')
const { getPenguinbdUrl, parseTextPenguinbd } = require('./shops/penguinbd')
const { getPickabooUrl, parseTextPickaboo } = require('./shops/pickaboo')
const { getRobishopUrl, parseTextRobishop } = require('./shops/robishop')
const { getTrendytrackerUrl, parseTextTrendytracker } = require('./shops/trendytracker')


// get array of fetch promises
const getFetchs = (urls) => {
    return urls.map(url => fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.41",
        },
        referrer: ''
    }))
}


// process responses
const processResponses = async (responses, allResults, isSecondary, formData) => {
    let urls = []
    let resDict = {
        'robishop.com.bd': [],
        'www.pickaboo.com': [],
        'www.searchanise.com': [], // penguinbd
        'api.trendy-tracker.com': [],
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
            console.log(response.status, response.statusText)
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
            if (key === 'robishop.com.bd') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextRobishop(text, isSecondary)) //json
                })
            }
            if (key === 'www.pickaboo.com') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextPickaboo(text, isSecondary))
                })
            }
            if (key === 'www.searchanise.com') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextPenguinbd(text, isSecondary)) //json
                })
            }
            if (key === 'api.trendy-tracker.com') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextTrendytracker(text, isSecondary)) //json
                })
            }
            if (key === 'gadgetandgear.com') {
                resultArrArr[value].forEach(text => {
                    const { links, results } = parseTextGadgetngear(text, isSecondary, formData)
                    urls = urls.concat(links)
                    allResults = allResults.concat(results)
                })
            }
        }

        if (!isSecondary && urls.length > 0) {
            return await secondaryFetch(urls, allResults, formData)
        } else {
            console.log(allResults.length)
            return allResults
        }
    }).catch(e => console.log(e))
}


// secondary fetch
const secondaryFetch = async (urls, allResults, formData) => {
    console.log('secondary')
    let secondaryPromises = getFetchs(urls)
    Promise.all(secondaryPromises).then(responses => {
        return await processResponses(responses, allResults, true, formData)
    }).catch(e => console.log(e))
}


// primary fetch
const primaryFetch = async (data) => {
    let urls = []
    data.shops.forEach(shop => {
        switch (shop) {
            case 'robishop':
                urls.push(getRobishopUrl(data.q))
                break
            case 'pickaboo':
                urls.push(getPickabooUrl(data.q))
                break
            case 'penguinbd':
                urls.push(getPenguinbdUrl(data.q))
                break
            case 'trendytracker':
                urls.push(getTrendytrackerUrl(data.q))
                break
            case 'gadgetngear':
                urls.push(getGadgetngearUrl(data.q))
                break
            default:
                break
        }
    })
    console.log(urls)
    let primaryPromises = getFetchs(urls)
    Promise.all(primaryPromises).then(responses => {
        const allResults = await processResponses(responses, [], false, data)
        return allResults
    }).catch(e => console.log(e))
}

module.exports = { primaryFetch }
