const postValidation = ({ title, content }) => {
  switch (true) {
    case !title: return { errCode: 400, message: '"title" is required' };
    case !content: return { errCode: 400, message: '"content" is required' };
    default: return true;
  }
};

module.exports = { postValidation };