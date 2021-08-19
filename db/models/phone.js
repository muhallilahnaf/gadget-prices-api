const mongoose = require('mongoose')

const phoneSchema = mongoose.Schema({
    shop: {type: String, required: true},
    name: {type: String, required: true},
    link: {type: String, required: true},
    prices: [{
        version: {
            type: String,
            match: [/\d{6}[ABC]/, 'invalid version format'],
            required: true
        },
        price: {
            type: Number,
            min: 1,
            required: true
        }
    }],
    brand: {type: String, required: true},
    status: {type: String, required: true},
    latestPrice: {type: Number, min: 1, required: true},
    latestVersion: {type: String, match: [/\d{6}[ABC]/, 'invalid version format'], required: true}
}, {
    timestamps: true,
    collection: 'phones'
})

module.exports = mongoose.model('Phone', phoneSchema)