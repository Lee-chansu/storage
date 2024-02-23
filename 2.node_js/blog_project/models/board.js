'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.member,{
        targetKey : "id",
        foreignKey : "writer"
      })
    }
  }
  board.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    // writer: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    readhit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'board',
  });
  return board;
};