// 테이블과 모델을 연결하는 코드

const Sequelize = require('sequelize');
const config = require('../config/config.json');

// db접속 정보
const{username, password, database, host, dialect} = config.development;
const sequelize = new Sequelize(database, username, password,{host, dialect})

// 모델의 정보를 Member에 불러온 후 db에 담아서 내보낸다(export)
const db = {} // 빈 db 객체를 생성
const Member = require('./member')(sequelize, Sequelize.DataTypes)

db.Member = Member
module.exports = db