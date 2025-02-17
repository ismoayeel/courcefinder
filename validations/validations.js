import joi from "joi"

const regionValidation = joi.object({
    name: joi.string().required()
})

const oquvMarkazValidation = joi.object({
    userId: joi.number().required(),
    name: joi.string().required(),
    filialSoni: joi.number().required(),
    address: joi.string().required(),
    location: joi.string().required(),
    regionId: joi.number().required()
})

const likedValidation = joi.object({
    userId: joi.number().required(),
    oquvMarkazId: joi.number().required()
})

const filialValidation = joi.object({
    oquvMarkazId: joi.number().required(),
    regionId: joi.number().required(),
    name: joi.string().required(),
    address: joi.string().required(),
    location: joi.string().required()
})

const commentValidation = joi.object({
    userId: joi.number().required(),
    msg: joi.string().required(),
    star: joi.number().min(0).max(10).required(),
    oquvMarkazId: joi.number().required()
})

export { regionValidation, oquvMarkazValidation, likedValidation, filialValidation, commentValidation }