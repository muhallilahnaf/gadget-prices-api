module.exports = (app) => {

    const fetchResults = require('../controllers/search')

    // get search results
    app.get('/search', fetchResults)

}