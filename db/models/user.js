const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true,
    collection: 'users'
})

userSchema.methods.generateAuthToken = () => {
    return jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY)
}

module.exports = mongoose.model("User", userSchema)