const rescue = require('express-rescue');
const Categories = require('../services/Categories');

const create = rescue(async (req, res, next) => {
  const { name } = req.body;
  const category = await Categories.create({ name });
  if (category.errCode) return next(category);
  return res.status(201).json(category);
});

const getAll = rescue(async (_req, res, _next) => {
  const categories = await Categories.getAll();
  return res.status(200).json(categories);
});

module.exports = {
  create,
  getAll,
};