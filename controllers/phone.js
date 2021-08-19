const Phone = require('../db/models/phone')
const Version = require('../db/models/version')
const { phoneUpdateReqValidation, keys } = require('../helpers/phone')

const create = (req, res) => {
    let dict = {}
    keys.forEach(key => {
        dict[key] = req.body[key]
    })
    const phone = new Phone(dict)
    phone.save().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Phone"
        })
    })
}


const findAll = (req, res) => {
    Phone.find().lean().then(phones => {
        res.send(phones)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving phones"
        })
    })
}


const findByVersionName = (req, res) => {
    const name = req.params.versionName
    if (!name) {
        return res.status(500).send({
            message: 'info missing'
        })
    }
    Phone.find({ latestVersion: name }).lean().then(phones => {
        res.send(phones)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving phones"
        })
    })
}


const updateOrCreate = (req, res) => {
    const invalid = phoneUpdateReqValidation(req.body)
    if (invalid) {
        return res.status(500).send({
            message: "info missing"
        })
    }
    const query = {
        shop: req.body.shop,
        name: req.body.name
    }
    const update = {
        $set: {
            shop: req.body.shop,
            name: req.body.name,
            link: req.body.link,
            brand: req.body.brand,
            status: req.body.status,
            latestVersion: req.body.version
        },
        $push: {
            prices: {
                price: req.body.price,
                version: req.body.version
            }
        }
    }
    const options = { upsert: true, new: true, setDefaultsOnInsert: true }
    Phone.findOneAndUpdate(query, update, options).then(phone => {
        return res.send(phone)
    }).catch(err => {
        return res.status(500).send({
            message: err.message
        })
    })
}


const findLatest = () => {
    Version.find().sort({ updatedAt: -1 }).limit(1).lean().then(version => {
        // TODO: find out way to add options for mongo query
        const name = version[0]['name']
        const shop = req.query.shop
        const order = req.query.order
        const priceMin = req.query.priceMin
        const priceMax = req.query.priceMax

        if ((priceMin && !priceMax) || (!priceMin && priceMax)) return res.send('both priceMin and priceMax required')

        if (order) {
            const direction = order === 'desc' ? -1 : 1
            // TODO: fix sort (prices.lastElement.price)
            Phone.find({ latestVersion: name }).sort({ prices: direction }).lean().then(phones => {
                return res.send(phones)
            }).catch(err => {
                return res.status(500).send({
                    message: err.message || "Some error occurred while retrieving phones"
                })
            })
        }

    }).catch(err => {
        return res.status(404).send({
            message: err.message
        })
    })
}

module.exports = {
    create, findByVersionName, findAll, updateOrCreate, findLatest
}