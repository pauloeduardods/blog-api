const Joi = require('joi');

const displayName = Joi.string().min(8).required();
const email = Joi.string().email().required();
const password = Joi.string().min(6).required().messages({
  'string.min': '"password" length must be {#limit} characters long',
});

const newUserSchema = Joi.object({
  displayName,
  email,
  password,
});

const loginSchema = Joi.object({
  email,
  password,
});

module.exports = {
  newUserSchema,
  loginSchema,
};
