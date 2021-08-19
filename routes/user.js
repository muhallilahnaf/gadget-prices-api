module.exports = (app) => {

    const userControllers = require('../controllers/user')
    const auth = require("../middlewares/auth")

    // create account
    app.post('/user/create', userControllers.create)

    // login to account
    app.post('/user/login', userControllers.login)

    // get account info
    app.get('/user', auth, userControllers.getProfile)
}