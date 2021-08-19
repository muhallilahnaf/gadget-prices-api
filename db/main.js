const mongoose = require('mongoose')

module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
        await mongoose.connect(process.env.DBURL, connectionParams)
        console.log("Successfully connected to the database")
    } catch (error) {
        console.log("could not connect to database. Exiting now... ", error)
        process.exit()
    }
}
