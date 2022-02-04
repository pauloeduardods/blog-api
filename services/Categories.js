const { Categories } = require('../models');

async function create({ name }) {
  if (!name) return { errCode: 400, message: '"name" is required' };
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