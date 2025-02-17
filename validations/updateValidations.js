import joi from "joi"

const regionUpdate = joi.object({
    name: joi.string().optional()
})

const oquvMarkazUpdate = joi.object({
    userId: joi.number().optional(),
    name: joi.string().optional(),
    filialSoni: joi.number().optional(),
    address: joi.string().optional(),
    location: joi.string().optional(),
    regionId: joi.number().optional(),
    image: joi.string().optional()
})

const likedUpdate = joi.object({
    userId: joi.number().optional(),
    oquvMarkazId: joi.number().optional()
})

const filialUpdate = joi.object({
    oquvMarkazId: joi.number().optional(),
    regionId: joi.number().optional(),
    name: joi.string().optional(),
    address: joi.string().optional(),
    location: joi.string().optional(),
    image: joi.string().optional()
})

const commentUpdate = joi.object({
    userId: joi.number().optional(),
    msg: joi.string().optional(),
    star: joi.number().min(0).max(10).optional(),
    oquvMarkazId: joi.number().optional()
})

export { regionUpdate, oquvMarkazUpdate, likedUpdate, filialUpdate, commentUpdate }