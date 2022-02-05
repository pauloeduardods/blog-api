const { BlogPosts, PostsCategories } = require('../models');

async function create({ title, content, categoryIds }, userId) {
  const post = { 
    title, 
    content, 
    userId,
    published: new Date().toISOString(),
    updated: new Date().toISOString(),
  };
  const { null: id, dataValues } = await BlogPosts.create(post);
  await Promise.all(categoryIds.map((categoryId) =>
    PostsCategories.create({ postId: id, categoryId })));
  return { id, userId, title: dataValues.title, content: dataValues.content };
}

module.exports = {
  create,
};