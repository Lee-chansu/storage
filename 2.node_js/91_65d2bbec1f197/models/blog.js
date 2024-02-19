'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {}
  }
  Blog.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};