document.addEventListener('DOMContentLoaded', () => {
    // side nav
    let elemsSidenav = document.querySelectorAll('.sidenav')
    let instancesSidenav = M.Sidenav.init(elemsSidenav)

    // select
    let elemsSelect = document.querySelectorAll('select')
    let instancesSelect = M.FormSelect.init(elemsSelect)

    // tooltip
    let elemsTooltip = document.querySelectorAll('.tooltipped')
    let instancesTooltip = M.Tooltip.init(elemsTooltip)

    // floating button
    let elemsFloatingBtn = document.querySelectorAll('.fixed-action-btn')
    let instancesFloatingBtn = M.FloatingActionButton.init(elemsFloatingBtn)

    // modal
    let elemsModal = document.querySelectorAll('.modal')
    let instancesModal = M.Modal.init(elemsModal)
})


// elements
const loader = document.getElementById('loader')

const search = document.getElementById('search')
const fdl = document.getElementById('fdl')
const oppo = document.getElementById('oppo')
const realme = document.getElementById('realme')
const robishop = document.getElementById('robishop')
const transcom = document.getElementById('transcom')
const vivo = document.getElementById('vivo')
const mi = document.getElementById('mi')
const excel = document.getElementById('excel')
const salextra = document.getElementById('salextra')
const pickaboo = document.getElementById('pickaboo')
const galaxyshop = document.getElementById('galaxyshop')
const daraz = document.getElementById('daraz')
const gadgetngear = document.getElementById('gadgetngear')
const all = document.getElementById('all')
const shopError = document.getElementById('shop-error')
const buttonGet = document.getElementById('get')

const sortFilterCard = document.getElementById('sort-filter-card')
const sort = document.getElementById('sort')
const sortBy = document.getElementById('sort-by')
const sortByError = document.getElementById('sort-by-error')
const minPrice = document.getElementById('min-price')
const maxPrice = document.getElementById('max-price')
const buttonPriceFilter = document.getElementById('filter-price')
const buttonPriceFilterCancel = document.getElementById('filter-price-cancel')
const viewSwitch = document.getElementById('view-switch')

const output = document.getElementById('output')

const buttonCompareFloating = document.querySelector('.compare-floating')
const modalCollection = document.querySelector('#modal-compare ul.collection')
const buttonViewCompare = document.getElementById('view-compare')

const allShops = {
    fdl,
    oppo,
    realme,
    robishop,
    transcom,
    vivo,
    mi,
    excel,
    salextra,
    pickaboo,
    galaxyshop,
    // daraz,
    gadgetngear
}

const sortValues = [
    'price-asc',
    'price-desc',
    'antutu-asc',
    'antutu-desc',
]

const detailButtonsCls = [
    { class: 'chipset', label: '(see details)' },
    { class: 'rearcam', label: '(see details)' },
    { class: 'frontcam', label: '(see details)' },
    { class: 'connectivity', label: '(see more connectivity)' },
    { class: 'sensor-port', label: '(see more sensors)' },
]


// global vars
const parser = new DOMParser()
const proxy = 'https://cors-matbot.herokuapp.com/'
let headers = new Headers({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.41",
})
let parsedResults = []
let filteredResults = []
let salextraLinks = []
let priceFilter = {}
let compareList = []


const brands = [
    'Apple',
    'Samsung',
    'Oppo',
    'realme',
    'Vivo',
    'Xiaomi',
    'Nokia',
    'Lenovo',
    'Sony',
    'Motorola',
    // 'iQOO',
    'OnePlus',
    'Infinix',
    'TECNO',
    // 'Poco',
    // 'Redmi',
    // 'Mi',
    'Huawei',
    // 'Walton',
]
