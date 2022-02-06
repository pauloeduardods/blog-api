const rescue = require('express-rescue');

const Posts = require('../services/Posts');

const create = rescue(async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;
  const result = await Posts.create({ title, content, categoryIds }, userId);
  if (result.errCode) return next(result);
  return res.status(201).json(result);
});

const getAll = rescue(async (_req, res, next) => {
  const posts = await Posts.getAll();
  if (posts.errCode) return next(posts);
  return res.status(200).json(posts);
});

module.exports = {
  create,
  getAll,
};