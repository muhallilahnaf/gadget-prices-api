const { JSDOM } = require("jsdom")

// check pagination robishop
const checkPaginationRobishop = (text, formData) => {
    let links = []
    // fetched through ajax
    return links
}


// parse robishop html doc
const parseRobishop = (text) => {
    const products = text['hits']['hits']
    let results = []
    if (products) {

        products.forEach(p => {
            let name = ''
            let link = ''
            let price = ''
            let brand = ''
            let status = ''

            const source = p['_source']
            if (source) {
                if (source['name']) {
                    name = source['name']
                }

                if (source['url_path']) {
                    link = `https://robishop.com.bd/${source['url_path']}`
                }

                if (`${source['special_price_incl_tax']}` != '0') {
                    price = `${source['special_price_incl_tax']}`

                } else if (`${source['final_price_incl_tax']}` != '0') {
                    price = `${source['final_price_incl_tax']}`

                } else if (`${source['price_incl_tax']}` != '0') {
                    price = `${source['price_incl_tax']}`
                }

                if (source['stock']['is_in_stock']) {
                    status = `${source['stock']['is_in_stock']}` === 'true' ? 'in stock' : 'out of stock'
                }

                const product = {
                    shop: 'robishop', name, link, price, brand, status
                }
                results.push(product)
            }
        })
    }
    return results

}


// generate robishop url
const getRobishopUrl = (q) => {
    return `https://robishop.com.bd/api/catalog/robishop/product/_search?_source_exclude=attribute_set_id%2Cconfigurable_options%2Cdescription%2Csgn%2C%2A.sgn%2Cmsrp_display_actual_price_type%2C%2A.msrp_display_actual_price_type%2Crequired_options%2Cmedia_gallery%2Cstock.use_config_min_qty%2Cstock.use_config_notify_stock_qty%2Cstock.stock_id%2Cstock.use_config_backorders%2Cstock.use_config_enable_qty_inc%2Cstock.enable_qty_increments%2Cstock.use_config_manage_stock%2Cstock.use_config_min_sale_qty%2Cstock.notify_stock_qty%2Cstock.use_config_max_sale_qty%2Cstock.use_config_max_sale_qty%2Cstock.qty_increments%2Cstock.stock_status_changed_auto%2Cstock.show_default_notification_message%2Cstock.use_config_qty_increments%2Cstock.is_decimal_divided&_source_include=activity%2Cconfigurable_children.attributes%2Cconfigurable_children.id%2Cconfigurable_children.final_price%2Cconfigurable_children.color%2Cconfigurable_children.original_price%2Cconfigurable_children.original_price_incl_tax%2Cconfigurable_children.price%2Cconfigurable_children.price_incl_tax%2Cconfigurable_children.size%2Cconfigurable_children.sku%2Cconfigurable_children.special_price%2Cconfigurable_children.special_price_incl_tax%2Cconfigurable_children.tier_prices%2Cconfigurable_children.special_from_date%2Cconfigurable_children.special_to_date%2Cfinal_price%2Cid%2Cimage%2Cname%2Cnew%2Coriginal_price_incl_tax%2Coriginal_price%2Cprice%2Cprice_incl_tax%2Cproduct_links%2Csale%2Cspecial_price%2Cspecial_to_date%2Cspecial_from_date%2Cspecial_price_incl_tax%2Cstatus%2Ctax_class_id%2Ctier_prices%2Ctype_id%2Curl_path%2Curl_key%2C%2Aimage%2Cstock.is_in_stock%2C%2Asku%2C%2Asmall_image%2Ccategory%2Ccategory_ids%2Chotdeals_position%2Cshow_countdown%2Cconfigurable_children.hotdeals_position%2Cconfigurable_children.show_countdown%2Cproduct_stickers&from=0&request=%7B%22query%22%3A%7B%22bool%22%3A%7B%22filter%22%3A%7B%22bool%22%3A%7B%22must%22%3A%5B%7B%22terms%22%3A%7B%22visibility%22%3A%5B3%2C4%5D%7D%7D%2C%7B%22terms%22%3A%7B%22status%22%3A%5B0%2C1%5D%7D%7D%5D%7D%7D%2C%22must%22%3A%7B%22function_score%22%3A%7B%22functions%22%3A%5B%7B%22filter%22%3A%7B%22match%22%3A%7B%22attribute_code%22%3A%22attribute_value%22%7D%7D%2C%22weight%22%3A1%7D%5D%2C%22score_mode%22%3A%22multiply%22%2C%22boost_mode%22%3A%22multiply%22%2C%22max_boost%22%3A100%2C%22min_score%22%3A1%2C%22query%22%3A%7B%22bool%22%3A%7B%22should%22%3A%5B%7B%22multi_match%22%3A%7B%22fields%22%3A%5B%22name%5E4%22%2C%22sku%5E2%22%2C%22category.name%5E1%22%5D%2C%22query%22%3A%22${q}%22%2C%22operator%22%3A%22or%22%2C%22fuzziness%22%3A2%2C%22cutoff_frequency%22%3A0.01%2C%22max_expansions%22%3A3%2C%22prefix_length%22%3A2%2C%22minimum_should_match%22%3A%2275%2525%22%2C%22tie_breaker%22%3A%221%22%7D%7D%2C%7B%22bool%22%3A%7B%22should%22%3A%5B%7B%22terms%22%3A%7B%22configurable_children.sku%22%3A%5B%22${q}%22%5D%7D%7D%2C%7B%22match_phrase%22%3A%7B%22sku%22%3A%7B%22query%22%3A%22${q}%22%2C%22boost%22%3A1%7D%7D%7D%2C%7B%22match_phrase%22%3A%7B%22configurable_children.sku%22%3A%7B%22query%22%3A%22${q}%22%2C%22boost%22%3A1%7D%7D%7D%5D%7D%7D%5D%7D%7D%7D%7D%7D%7D%2C%22min_score%22%3A0.02%7D&size=18&sort=`
}


// parse html string for robishop
const parseTextRobishop = (text, isSecondary, formData) => {
    let links = []

    const results = parseRobishop(JSON.parse(text))
    if (!isSecondary) {
        links = checkPaginationRobishop(text, formData)
    }
    return { links, results }
}

module.exports = { getRobishopUrl, parseTextRobishop }