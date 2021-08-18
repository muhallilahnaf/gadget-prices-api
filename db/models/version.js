const mongoose = require('mongoose')

const versionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/\d{6}[ABC]/, 'invalid version format'],
        unique: true
    }
}, {
    timestamps: true,
    collection: 'versions'
})

module.exports = mongoose.model('Version', versionSchema)