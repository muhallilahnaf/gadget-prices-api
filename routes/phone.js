module.exports = (app) => {
    
    const phoneControllers = require('../controllers/phone')

    // Create a new Phone
    app.post('/phone', phoneControllers.create)

    // Retrieve all Phones
    app.get('/phone', phoneControllers.findAll)

    // Retrieve a single Phone with phoneId
    app.get('/phone/:phoneId', phoneControllers.findOne)

    // Update a Phone with phoneId
    app.put('/phone/:phoneId', phoneControllers.update)

    // Delete a Phone with phoneId
    app.delete('/phone/:phoneId', phoneControllers.delete)
}