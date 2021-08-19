const Joi = require("joi")

const validateCreate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    return schema.validate(user)
}

const validateLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    return schema.validate(user)
}


module.exports = { 
    validateCreate,
    validateLogin
}