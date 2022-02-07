const argon = require('argon2');
const { generateToken } = require('../auth/login');
const { Users } = require('../models');
const { loginSchema, newUserSchema } = require('../schemas/Users');

async function create({ displayName, email, password, image }) {
  const validator = newUserSchema.validate({ displayName, email, password });
  if (validator.error) return { errCode: 400, message: validator.error.message };
  const userWithEmail = await Users.findOne({ where: { email } });
  if (userWithEmail) return { errCode: 409, message: 'User already registered' };
  const digest = await argon.hash(password, { type: argon.argon2id });
  const user = await Users.create({ displayName, email, password: digest, image });
  const token = generateToken({ name: user.displayName, email: user.email });
  return { token };
}

async function login({ email, password }) {
  const validator = loginSchema.validate({ email, password });
  if (validator.error) return { errCode: 400, message: validator.error.message };
  const user = await Users.findOne({ where: { email } });
  if (!user) return { errCode: 400, message: 'Invalid fields' };
  const passwordValidation = await argon.verify(user.password, password, { type: argon.argon2id });
  if (!passwordValidation) return { errCode: 400, message: 'Invalid fields' };
  const token = generateToken({ id: user.id, name: user.displayName, email: user.email });
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

async function deleteUser(id) {
  await Users.destroy({ where: { id } });
  return id;
}

module.exports = {
  create,
  login,
  getAll,
  getById,
  deleteUser,
};