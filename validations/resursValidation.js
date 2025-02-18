import joi from "joi";

const resursValidation = joi.object({
  userId: joi.number().required(),
  name: joi.string().min(4).required(),
  media: joi.string().required(),
  desc: joi.string().required(),
});

const resursCategoryValidation = joi.object({
  name: joi.string().min(4).required(),
  image: joi.string().required(),
});

const resursItemvalidation = joi.object({
  resursId: joi.number().required(),
  resursCategoryId: joi.number().required(),
});

export { resursValidation, resursCategoryValidation, resursItemvalidation };
