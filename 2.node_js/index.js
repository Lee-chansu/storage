const express = require('express');

const app = express() // app 객체 생성
const mysql = require('mysql')
const dbConfig = { //리터럴 객체
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'mall'
}

const db = mysql.createConnection(dbConfig);

app.listen(8080, () => {
    console.log('접속 고고 - http://localhost:8080')
})

app.get('/', (req,res) => {
    res.send('<h1>index 페이지입니다.</h1>')
})