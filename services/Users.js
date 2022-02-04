const argon = require('argon2');
const { generateToken } = require('../auth/login');
const { Users } = require('../models');
const UserValidator = require('../validations/User');

async function create({ displayName, email, password, image }) {
  const { errCode, message } = UserValidator.userValidator(displayName, email, password);
  if (errCode) return { errCode, message };
  const userWithEmail = await Users.findOne({ where: { email } });
  if (userWithEmail) return { errCode: 409, message: 'User already registered' };
  const digest = await argon.hash(password, { type: argon.argon2id });
  const user = await Users.create({ displayName, email, password: digest, image });
  const token = generateToken({ name: user.displayName, email: user.email });
  return { token };
}

async function login({ email, password }) {
  const { errCode, message } = UserValidator.loginValidator(email, password);
  if (errCode) return { errCode, message };
  const user = await Users.findOne({ where: { email } });
  if (!user) return { errCode: 400, message: 'Invalid fields' };
  const passwordValidation = await argon.verify(user.password, password, { type: argon.argon2id });
  if (!passwordValidation) return { errCode: 400, message: 'Invalid fields' };
  const token = generateToken({ name: user.displayName, email: user.email });
  return { token };
}

async function getAll() {
  const users = await Users.findAll();
  return users;
}

async function getById(id) {
  const user = await Users.findOne({ where: { id } });
  if (!user) return { errCode: 404, message: 'User does not exist' };
  delete user.password;
  return user;
}

module.exports = {
  create,
  login,
  getAll,
  getById,
};