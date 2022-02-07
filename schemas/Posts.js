const Joi = require('joi');

const title = Joi.string().required();
const content = Joi.string().required();
const categoryIds = Joi.array().items(Joi.number().integer()).required();

const postSchema = Joi.object({
  title,
  content,
  categoryIds,
});

const updatePostSchema = Joi.object({
  title,
  content,
});

module.exports = { postSchema, updatePostSchema };