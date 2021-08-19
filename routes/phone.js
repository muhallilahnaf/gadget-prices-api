module.exports = (app) => {

    const phoneControllers = require('../controllers/phone')

    // Retrieve all Phones
    app.get('/phone', phoneControllers.findAll)

    // Retrieve Phones by version
    app.get('/phone/version/:versionName', phoneControllers.findByVersionName)

    // Retrieve the latest version phones
    app.get('/phone/latest', phoneControllers.findLatest)

    // Update or create a Phone with shop and name
    app.put('/phone', phoneControllers.updateOrCreate)
}