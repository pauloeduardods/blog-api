const { BlogPosts, PostsCategories, Categories, sequelize, Users } = require('../models');
const { postValidation } = require('../validations/Post');

async function categoryValidation(categoryIds) {
  if (!categoryIds) {
    return { errCode: 400, message: '"categoryIds" is required' };
  }
  const result = await Promise.all(categoryIds.map(async (categoryId) => {
    const category = await Categories.findOne({ where: { id: categoryId } });
    if (!category) {
      return { errCode: 400, message: '"categoryIds" is required' };
    }
    return true;
  }));
  return result.some((category) => category.errCode)
    ? { errCode: 400, message: '"categoryIds" not found' } : true;
}

function createPostObj({ title, content, userId }) {
  return {
    title,
    content,
    userId,
    published: new Date().toISOString(),
    updated: new Date().toISOString(),
  };
}

async function create({ title, content, categoryIds }, userId) {
  const validation = postValidation({ title, content });
  if (validation.errCode) return validation;
  const catValidation = await categoryValidation(categoryIds);
  if (catValidation.errCode) return catValidation;
  const t = await sequelize.transaction();
  try {
    const post = createPostObj({ title, content, userId });
    const { null: id, dataValues } = await BlogPosts.create(post, { transaction: t });
    await Promise.all(categoryIds.map((categoryId) =>
      PostsCategories.create({ postId: id, categoryId }, { transaction: t })));
    await t.commit();
    return { id, userId, title: dataValues.title, content: dataValues.content };
  } catch (err) {
    await t.rollback();
  }
}

const options = {
  attributes: ['id', 'title', 'content', 'published', 'updated', 'userId'],
  include: [{
    model: Users,
    as: 'user',
    attributes: { exclude: ['password'] },
  },
  {
    model: Categories,
    as: 'categories',
    through: { attributes: [] },
  }],
};

async function getAll() {
  const posts = await BlogPosts.findAll(options);
  return posts;
}

async function getById(id) {
  const post = await BlogPosts.findByPk(id, options);
  if (!post || post.length === 0) return { errCode: 404, message: 'Post does not exist' };
  return post;
}

module.exports = {
  create,
  getAll,
  getById,
};