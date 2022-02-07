const Joi = require('joi');

const name = Joi.string().required();

const categorySchema = Joi.object({
  name,
});

module.exports = {
  categorySchema,
};