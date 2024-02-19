// 1. 모듈 - require
const express = require('express')
const app = express()

//session 모듈
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// db
const db = require('./models');

// 2. use, set - 등록
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(express.json()) // json형태로 데이터 처리
app.use(express.urlencoded({extended : true}))  // queryString 방식의 데이터 처리

// 3. listen - 포트번호 지정
app.listen(3000 , ()=>{
  console.log('접속 성공! - http://localhost:3000 ')
})


// 4. 하위페이지들 - 라우팅 

app.get('/', (req, res)=>{
  res.render('index.ejs')
})

app.get('/login', (req, res)=>{
  res.render('login.ejs')

})