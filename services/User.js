const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const UserValidator = require('../validations/User');

async function create({ displayName, email, password, image }) {
  const { errCode, message } = UserValidator.userValidator(displayName, email, password);
  if (errCode) return { errCode, message };
  const userWithEmail = await Users.findOne({ where: { email } });
  if (userWithEmail) return { errCode: 409, message: 'User already registered' };
  const user = await Users.create({ displayName, email, password, image });
  const payload = {
    id: user.id,
    name: user.displayName,
    email: user.email,
  };
  const options = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return { token };
}

module.exports = {
  create,
};