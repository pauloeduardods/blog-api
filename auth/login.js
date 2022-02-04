const jwt = require('jsonwebtoken');

const generateToken = ({ name, email }) => {
  const payload = {
    name,
    email,
  };
  const options = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
};

module.exports = {
  generateToken,
};