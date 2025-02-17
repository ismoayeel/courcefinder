import joi from "joi"

let registerValidate = joi.object({
    fullname: joi.string().required(),
    image: joi.string().optional(),
    email: joi.string().required(),
    phone: joi.string().max(15).required(),
    password: joi.string().required(),
    role: joi.string().valid("user", "seo", "admin").required()
})

let userUpdateValid = joi.object({
    fullname: joi.string().optional(),
    image: joi.string().optional(),
    email: joi.string().optional(),
    phone: joi.string().max(15).optional(),
    password: joi.string().optional(),
    role: joi.string().valid("user", "seo", "admin").optional()
})

export  {registerValidate, userUpdateValid}

