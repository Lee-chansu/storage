// express 라이브러리 준비
const express = require('express');
const app = express();

// db 설정 준비
const mysql = require('mysql2');
const dbConfig = require('./db');
const mydb = mysql.createConnection(dbConfig);

//app.use app.set
app.set('view engine', 'ejs');
app.set(express.static(__dirname + './public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//listen - 포트번호 설정
app.listen(8082, (req,res) => {
    console.log('접속 http://localhost:8082')
})

// 라우팅 - 하위페이지 신설
app.get('/', (req,res)=>{
    res.render('index')
})