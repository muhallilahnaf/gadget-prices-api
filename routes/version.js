module.exports = (app) => {
    
    const versionControllers = require('../controllers/version')

    // Create a new Version
    app.post('/version', versionControllers.create)

    // Retrieve all Versions
    app.get('/version', versionControllers.findAll)

    // Retrieve a single version with version name
    app.get('/version/:versionName', versionControllers.findOne)

    // Retrieve the latest version
    app.get('/version/latest', versionControllers.findLatest)
}