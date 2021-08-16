const Phone = require('../db/models/phone')
const {phoneReqValidation} = require('../helpers/phone') 

const create = (req, res) => {
    // Validate request
    // phonereqvaliation
    if(!req.body.content) {
        return res.status(400).send({
            message: "Phone content can not be empty"
        })
    }

    // Create a Phone
    const phone = new Phone({
        shop: req.body.shop,
        name: req.body.name,
        link: req.body.link,
        price: req.body.price,
        brand: req.body.brand,
        status: req.body.status
    })

    // Save Note in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
}

// Create and Save a new phone
exports.create = (req, res) => {

};

// Retrieve and return all phones from the database.
exports.findAll = (req, res) => {

};

// Find a single phone with a phoneId
exports.findOne = (req, res) => {

};

// Update a phone identified by the phoneId in the request
exports.update = (req, res) => {

};

// Delete a phone with the specified phoneId in the request
exports.delete = (req, res) => {

};