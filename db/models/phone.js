const mongoose = require('mongoose')

const phoneSchema = mongoose.Schema({
    shop: String,
    name: String,
    link: String,
    price: Number,
    brand: String,
    status: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Phone', phoneSchema)