const rescue = require('express-rescue');

const Posts = require('../services/Posts');

const create = rescue(async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;
  const result = await Posts.create({ title, content, categoryIds }, userId);
  if (result.errCode) return next(result);
  return res.status(201).json(result);
});

module.exports = {
  create,
};