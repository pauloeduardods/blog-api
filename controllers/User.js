const rescue = require('express-rescue');

const User = require('../services/User');

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

module.exports = {
  create,
  login,
};
