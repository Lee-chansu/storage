'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    
    static associate(models) {
    }
  }
  Member.init({
    name: DataTypes.STRING,
    team: DataTypes.STRING,
    position: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    admissionDate: DataTypes.DATE,
    birthday: DataTypes.DATE,
    profileImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};