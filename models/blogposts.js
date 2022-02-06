const columns = (DataTypes) => ({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  userId: { type: DataTypes.INTEGER, foreignKey: true },
});

const options = {
  createdAt: 'published',
  updatedAt: 'updated',
  underscored: true,
  tableName: 'BlogPosts',
};

module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', columns(DataTypes), options);
  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return BlogPosts;
};