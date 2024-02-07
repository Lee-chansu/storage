// 모듈 - require
const express = require('express');
const app = express();

const mysql = require('mysql2');
const dbConfig = require('./db');
const db = mysql.createConnection(dbConfig);

// 2. use, set - 등록
app.use('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.json()) //json 형식으로 데이터 처리
app.use(express.urlencoded({extended : true})); // queryString 방식의 데이터 처리

// 3. listen - 포트번호 지정
app.listen('8082', ()=>{console.log('접속성공 - http://localhost:8082')})


// 4. 라우팅 - 하위 페이지 생성
app.get('/', (req,res) => {
    res.send('index 접속성공');
})

app.get('/add', (req,res) => {
    res.send('add 접속 성공')
})
app.post('/add', (req,res) => {

})