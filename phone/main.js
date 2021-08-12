// input validation
const validation = () => {
    shopError.textContent = ''

    let checked = false
    for (const [key, value] of Object.entries(allShops)) {
        if (value.checked) {
            checked = true
            break
        }
    }
    if (!checked) {
        shopError.textContent = 'select at least 1 shop'
        return false
    }

    let shops = []
    for (const [key, value] of Object.entries(allShops)) {
        if (value.checked) shops.push(key)
    }

    return {
        shops: shops,
    }
}


// price input validity
const validPrice = (m, v) => {
    if (v === 'valid') {
        m.classList.add('valid')
        m.classList.remove('invalid')
        return
    }
    m.classList.add('invalid')
    m.classList.remove('valid')
}


// all button eventlistener
all.addEventListener('change', () => {
    if (all.checked) {
        for (const [key, value] of Object.entries(allShops)) {
            value.checked = true
            value.setAttribute('disabled', 'true')
        }
        return
    }
    for (const [key, value] of Object.entries(allShops)) {
        value.checked = false
        value.removeAttribute('disabled')
    }
})


// fetch end
const fetchEnd = () => {
    sortFilterCard.style.display = 'block'
    createOutput()
    detailButtonsAdd()
    addTooltip()
    resetCompare()
    stopLoading()
    output.scrollIntoView({ behavior: "smooth", block: "nearest" })
}


// reset global vars
const resetGlobals = () => {
    parsedResults = []
    filteredResults = []
    priceFilter = {}
    salextraLinks = []
    compareList = []
    sortFilterCard.style.display = 'none'
    removeOutput()
}

// search form event listener
search.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = validation()
    if (formData) {
        resetGlobals()
        startLoading()
        primaryFetch(formData)
    }
})


// sort form event listener
sort.addEventListener('submit', (e) => {
    e.preventDefault()
    const checkedValue = sortValidate()
    if (checkedValue) {
        removeOutput()
        sortData(checkedValue)
        createOutput()
        detailButtonsAdd()
        addTooltip()
        resetCompare()
        output.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
})


// filter price event listener
buttonPriceFilter.addEventListener('click', () => {
    if (minPrice.value === '' && maxPrice.value !== '') {
        validPrice(minPrice, 'invalid')
        return false
    }
    validPrice(minPrice, 'valid')

    if (minPrice.value !== '' && maxPrice.value === '') {
        validPrice(maxPrice, 'invalid')
        return false
    }
    validPrice(maxPrice, 'valid')

    if (/\D+/gi.test(minPrice.value)) {
        validPrice(minPrice, 'invalid')
        return false
    }
    validPrice(minPrice, 'valid')

    if (/\D+/gi.test(maxPrice.value)) {
        validPrice(maxPrice, 'invalid')
        return false
    }
    validPrice(maxPrice, 'valid')

    if (minPrice.value !== '' && maxPrice.value !== '') {
        priceFilter['min'] = parseInt(minPrice.value)
        priceFilter['max'] = parseInt(maxPrice.value)
        removeOutput()
        filteredResults = []
        filterData('price')
        createOutput()
        detailButtonsAdd()
        addTooltip()
        resetCompare()
        output.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
})


// filter price cancel event listener
buttonPriceFilterCancel.addEventListener('click', () => {
    minPrice.value = ''
    maxPrice.value = ''
    removeOutput()
    filteredResults = []
    priceFilter = {}
    createOutput()
    detailButtonsAdd()
    addTooltip()
    resetCompare()
    output.scrollIntoView({ behavior: "smooth", block: "nearest" })
})


// add tooltip
const addTooltip = () => {
    let elemsTooltip = document.querySelectorAll('.tooltipped')
    let instancesTooltip = M.Tooltip.init(elemsTooltip)    
}


// view toggle
viewSwitch.addEventListener('change', () => {
    const compact = document.querySelectorAll('.card-body-compact')
    const full = document.querySelectorAll('.card-body-full')

    compact.forEach(node => node.classList.toggle('hide'))
    full.forEach(node => node.classList.toggle('hide'))
})


// add see more listener
const detailButtonsAdd = () => {
    detailButtonsCls.forEach(item => {
        const buttons = document.querySelectorAll(`.${item['class']}-button`)
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute(`data-${item['class']}-button`)
                const details = document.querySelector(`[data-${item['class']}-details="${id}"]`)
                if (details.style.display == 'block') {
                    details.style.display = 'none'
                    button.textContent = item['label']
                    return
                }
                details.style.display = 'block'
                button.textContent = item['label'].replace(/see more|see/g, 'hide')
            })
        })
    })
}


// compare item add
const compareItemAdd = (id, button, icon) => {
    if (!icon && !button) {
        button = document.querySelector(`[data-compare='${id}']`)
        icon = button.querySelector('i')
    }
    compareList.push(id)
    icon.textContent = 'clear'
    button.classList.remove('light-blue')
    button.classList.add('red')
}


// compare item remove
const compareItemRemove = (id, button, icon) => {
    if (!icon && !button) {
        button = document.querySelector(`[data-compare='${id}']`)
        icon = button.querySelector('i')
    }
    compareList = compareList.filter(a => a !== id)
    icon.textContent = 'add'
    button.classList.remove('red')
    button.classList.add('light-blue')
}


// compare floating button check
const checkCompareFloating = () => {
    if (compareList.length > 0) {
        buttonCompareFloating.style.display = 'block'
        buttonCompareFloating.querySelector('a').textContent = `${compareList.length}`
        buttonViewCompare.classList.remove('disabled')
        return
    }
    buttonCompareFloating.style.display = 'none'
    buttonViewCompare.classList.add('disabled')
}


// reset compare
const resetCompare = () => {
    compareList = []
    buttonCompareFloating.style.display = 'none'
    buttonViewCompare.classList.add('disabled')
}


// compare floating event listener
buttonCompareFloating.querySelector('a').addEventListener('click', () => {
    while (modalCollection.firstChild) {
        modalCollection.firstChild.remove()
    }
    compareList.forEach(item => {
        const li = createNode('li', ['collection-item', 'blue-grey', 'darken-3', 'white-text'])
        li.setAttribute('data-compare-collection-item', item)
        const div = createNode('div')
        const i = parseInt(item)
        const name = filteredResults.length === 0 ? parsedResults[i]['name'] : filteredResults[i]['name']
        // const name = 'hehe'
        const txt = document.createTextNode(name)
        const a = createNode('a', ['secondary-content'])
        a.setAttribute('data-compare-modal', item)
        a.addEventListener('click', () => {
            compareItemRemove(`${i}`)
            document.querySelector(`[data-compare-collection-item='${i}']`).remove()
            checkCompareFloating()
        })
        const icon = createNode('i', ['material-icons'], 'clear')
        a.appendChild(icon)
        div.appendChild(txt)
        div.appendChild(a)
        li.appendChild(div)
        modalCollection.appendChild(li)
    })
})


// view comparison button event listener
buttonViewCompare.addEventListener('click', () => {
    if (compareList.length > 0) {
        const compareItems = compareList.map(i => filteredResults.length === 0 ? parsedResults[i] : filteredResults[i])
        sessionStorage.setItem('compareItems', JSON.stringify(compareItems))
        window.open('./compare.html', '_blank')
    }
})


// loading start
const startLoading = () => {
    buttonGet.setAttribute('disabled', 'true')
    loader.classList.toggle('active')
}


// loading end
const stopLoading = () => {
    buttonGet.removeAttribute('disabled')
    loader.classList.toggle('active')
}
