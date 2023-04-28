let joi = require('joi');
let signupschema = joi.object({
    username:joi.string().min(5).max(10).required().alphanum(),
    email:joi.string().email().required(),
    password:joi.string().min(5).max(10).required()
})
let loginschema=joi.object({
    username:joi.string().required().min(5).max(10),
    password:joi.string().required().min(5).max(10)
})

module.exports ={signupschema,loginschema}