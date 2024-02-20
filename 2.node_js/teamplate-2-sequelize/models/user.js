'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.schedule, {foreignKey:"user_id"})
    }
  }
  user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phonenum: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};