const jwt = require('jsonwebtoken');

const generateToken = ({ id, name, email }) => {
  const payload = {
    id,
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

const tokenVerify = (token) => {
  const options = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET, options);
    if (!result) return false;
    const { id, name, email } = result;
    return { id, name, email };
  } catch (err) {
    return false;
  }
};

module.exports = {
  generateToken,
  tokenVerify,
};