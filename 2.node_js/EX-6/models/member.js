'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // 1번
  class Member extends Model {}

  //2번
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

//module.exports = (a,b) => {return {result : a+b}}
//const 변수 = require('./members')(a, b);
/*
  본래대로라면 함수에 이름이 있으면 함수에 이름을 붙여 표기해줘야 하지만
  exports하는 함수의 이름이 없으므로 함수 이름 없이 매개변수와 그 값만 표기해도
  함수가 실행될 수가 있다. 이는 exports할 때 함수의 이름을 정할 수 없기 때문이다.
  */

