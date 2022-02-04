const nameLength = (name) => String(name).length >= 8;

const emailValidation = (email) => {
  if (!email) return { errCode: 400, message: '"email" is required' };
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/;
  if (!regex.test(email)) return { errCode: 400, message: '"email" must be a valid email' };
  return true;
};

const passwordValidation = (password) => {
  if (!password) return { errCode: 400, message: '"password" is required' };
  if (password.length < 6) {
    return { errCode: 400, message: '"password" length must be 6 characters long' };
  }
  return true;
};

const userValidator = (name, email, password) => {
  if (!nameLength(name)) {
    return { errCode: 400, message: '"displayName" length must be at least 8 characters long' };
  }
  if (emailValidation(email).errCode) return emailValidation(email);
  if (passwordValidation(password).errCode) return passwordValidation(password);
  return true;
};

module.exports = {
  nameLength,
  emailValidation,
  passwordValidation,
  userValidator,
};
