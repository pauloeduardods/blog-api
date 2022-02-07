const { Op } = require('sequelize');
const { BlogPosts, PostsCategories, Categories, sequelize, Users } = require('../models');
const { postSchema, updatePostSchema } = require('../schemas/Posts');

async function categoryValidation(categoryIds) {
  const result = await Promise.all(categoryIds.map(async (categoryId) => {
    const category = await Categories.findOne({ where: { id: categoryId } });
    if (!category) {
      return false;
    }
    return true;
  }));
  if (result.some((category) => !category)) {
    return { error: { message: '"categoryIds" not found' } };
  }
  return {};
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
  const validation = postSchema.validate({ title, content, categoryIds });
  if (validation.error) return { errCode: 400, message: validation.error.message };
  const catValidation = await categoryValidation(categoryIds);
  if (catValidation.error) return { errCode: 400, message: catValidation.error.message };
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

async function update(id, userId, { title, content, categoryIds }) {
  if (categoryIds) return { errCode: 400, message: 'Categories cannot be edited' };
  if (userId !== (await BlogPosts.findByPk(id)).userId) { 
    return { errCode: 401, message: 'Unauthorized user' };
  }
  const validation = updatePostSchema.validate({ title, content });
  if (validation.error) return { errCode: 400, message: validation.error.message };
  const updateResult = await BlogPosts.update({
    title,
    content,
    updated: new Date().toISOString(),
  }, { where: { id } });
  if (updateResult[0] === 0) return { errCode: 404, message: 'Post does not exist' };
  const postUpdated = await BlogPosts.findByPk(id, options);
  return postUpdated;
}

async function deletePost(postId, userId) {
  const post = await BlogPosts.findByPk(postId);
  if (!post || post.length === 0) return { errCode: 404, message: 'Post does not exist' };
  if (userId !== post.userId) { 
    return { errCode: 401, message: 'Unauthorized user' };
  }
  const result = await BlogPosts.destroy({ where: { id: postId } });
  if (result === 0) return { errCode: 404, message: 'Post does not exist' };
  return { id: postId };
}

async function search(query) {
  const posts = await BlogPosts.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    ...options,
  });
  return posts;
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
  search,
};