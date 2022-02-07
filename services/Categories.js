const { Categories } = require('../models');
const { categorySchema } = require('../schemas/Categories');

async function create({ name }) {
  const validation = categorySchema.validate({ name });
  if (validation.error) return { errCode: 400, message: validation.error.message };
  const { null: id, dataValues } = await Categories.create({ name });
  return { ...dataValues, id };
}

async function getAll() {
  const categories = await Categories.findAll();
  return categories;
}

module.exports = {
  create,
  getAll,
};