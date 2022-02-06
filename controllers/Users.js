const rescue = require('express-rescue');

const User = require('../services/Users');

const create = rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const { token, errCode, message } = await User.create({ displayName, email, password, image });
  if (errCode) return next({ errCode, message });
  return res.status(201).json({ token });
});

const login = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const { token, errCode, message } = await User.login({ email, password });
  if (errCode) return next({ errCode, message });
  return res.status(200).json({ token });
});

const getAll = rescue(async (_req, res, _next) => {
  const users = await User.getAll();
  res.status(200).json(users);
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.getById(id);
  if (user.errCode) return next(user);
  res.status(200).json(user);
});

const deleteUser = rescue(async (req, res, next) => {
  const userId = req.user.id;
  const result = await User.deleteUser(userId);
  if (result.errCode) return next(result);
  res.status(204).json(result);
});

module.exports = {
  create,
  login,
  getAll,
  getById,
  deleteUser,
};
