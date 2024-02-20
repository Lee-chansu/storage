'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schedule extends Model {}
  schedule.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'schedule',
  });
  return schedule;
};