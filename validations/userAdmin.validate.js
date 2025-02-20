import joi from "joi"

let registerAdminValidate = joi.object({
    fullname: joi.string().required(),
    image: joi.string().optional(),
    email: joi.string().required(),
    phone: joi.string().max(15).required(),
    password: joi.string().required(),
    role: joi.string().valid("admin").required()
})


export { registerAdminValidate }

