'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.board,{
        sourceKey : "id",
          foreignKey : "writer"
      });
    }
  }
  member.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: DataTypes.STRING,
    pwd: DataTypes.STRING,
    nickname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'member',
  });
  return member;
};