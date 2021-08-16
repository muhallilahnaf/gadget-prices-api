const {password} = require('../secrets/db')

module.exports = {
    url: `mongodb+srv://muhallilahnaf:${password}@gadget-prices.nneqf.mongodb.net/gadget-prices?retryWrites=true&w=majority`
}