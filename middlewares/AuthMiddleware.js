const rescue = require('express-rescue');
const { tokenVerify } = require('../auth/login');

const tokenAuthentication = rescue(async (request, _response, next) => {
  const token = request.headers.authorization;
  if (!token) return next({ errCode: 401, message: 'Token not found' });
  const payload = tokenVerify(token);
  if (!payload) {
    return next({ errCode: 401, message: 'Expired or invalid token' });
  }
  request.user = payload;
  next();
});

module.exports = {
  tokenAuthentication,
};