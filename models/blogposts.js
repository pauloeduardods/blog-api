const columns = (DataTypes) => ({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  published: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updated: {
    type: DataTypes.DATE,
    field: 'updated_at',
  },
});

module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', columns(DataTypes), {
    underscored: true,
    tableName: 'BlogPosts',
  });
  return BlogPosts;
};