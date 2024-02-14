/* const Sequelize = require('sequelize');

const config = require(__dirname + '/../config/config.json');
const {username, password, database, host, dialect} = config.development
const sequelize = new Sequelize(database, username, password, {host, dialect})

const db = {}
const Member = require('./member')(sequelize, Sequelize.DataTypes)

db.Member = Member
module.exports = db;
 */



// 테이블과 모델을 연결하는 코드
const Sequelize = require('sequelize');


// db접속 정보
const config = require('../config/config.json') // db정보
const{username, password, database, host, dialect} = config.development;
const sequelize = new Sequelize(database, username, password,{host, dialect})

// 모델과 테이블 연결 
const db = {} // 빈 db 객체를 생성
const Member = require('./member')(sequelize, Sequelize.DataTypes)


db.Member = Member
module.exports = db
// 모델의 정보를 Member에 불러온 후 db에 담아서 내보낸다(export)
