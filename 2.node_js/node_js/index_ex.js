const express = require('express');
const app = express();

const mysql = require('mysql');
const dbConfig = {
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'mall'
}

app.listen(8080, ()=> {
    console.log('접속 고고! - http://localhost:8080')
})

app.get('/', (req, res)=> {
    res.send('<h1>index 페이지에요</h1>')
})