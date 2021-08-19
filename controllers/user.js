const bcrypt = require("bcrypt")
const User = require("../db/models/user")
const {validateCreate, validateLogin} = require('../helpers/user')


const create = async (req, res) => {
    try {
        const { error } = validateCreate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        const user = new User(req.body)
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()
        return res.send(user)
    } catch (error) {
        return res.send(error.message)
    }
}


const login = async (req, res) => {
    try {
        const { error } = validateLogin(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send("Invalid email")
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validPassword) return res.status(400).send("Invalid password")
        const token = user.generateAuthToken()
        return res.send(token)
    } catch (error) {
        return res.send(error.message)
    }
}


const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id, "password __v")
        return res.send(user)
    } catch (error) {
        return res.send(error.message)
    }
}


module.exports = {create, login, getProfile}