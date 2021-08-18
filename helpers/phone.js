const keys = ['shop', 'name', 'link', 'price', 'brand', 'status']

const phoneUpdateReqValidation = (body) => {
    return body['shop'] === undefined || body['name'] === undefined
}



module.exports = {
    phoneUpdateReqValidation, keys
}