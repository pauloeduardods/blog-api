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

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const post = await Posts.getById(id);
  if (post.errCode) return next(post);
  return res.status(200).json(post);
});

const update = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;
  const result = await Posts.update(id, userId, { title, content, categoryIds });
  if (result.errCode) return next(result);
  return res.status(200).json(result);
});

const deletePost = rescue(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const result = await Posts.deletePost(id, userId);
  if (result.errCode) return next(result);
  return res.status(204).json(result);
});

const search = rescue(async (req, res, next) => {
  const { q: query } = req.query;
  const posts = await Posts.search(query);
  if (posts.errCode) return next(posts);
  return res.status(200).json(posts);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
  search,
};