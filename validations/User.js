const nameLength = (name) => String(name).length >= 8;

const emailValidation = (email) => {
  if (!email && String(email).length !== 0) return { errCode: 400, message: '"email" is required' };
  const regex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.([a-z]+)?$/;
  if (email.length === 0) return { errCode: 400, message: '"email" is not allowed to be empty' };
  if (!regex.test(email)) return { errCode: 400, message: '"email" must be a valid email' };
  return true;
};

const passwordValidation = (password) => {
  if (!password && String(password).length !== 0) {
    return { errCode: 400, message: '"password" is required' };
  }
  if (password.length === 0) {
    return { errCode: 400, message: '"password" is not allowed to be empty' };
  }
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

const loginValidator = (email, password) => {
  if (emailValidation(email).errCode) return emailValidation(email);
  if (passwordValidation(password).errCode) return passwordValidation(password);
  return true;
};

module.exports = {
  nameLength,
  emailValidation,
  passwordValidation,
  userValidator,
  loginValidator,
};
