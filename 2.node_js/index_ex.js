const express = require('express');
const app = express();


//db 연결
let mysql = require('mysql');
let dbConfig = require('./db'); //export해서 db정보 받아오기
let db = mysql.createConnection(dbConfig);

// ejs
app.set('view engine', 'ejs');
//이미지 파일이나 css파일 적용시킬 경로 static으로 설정
app.use(express.static(__dirname + '/public'))
//form에서 데이터를 post 방식으로 담아올 때
app.use(express.json()); //json 형태로 데이터 처리
app.use(express.urlencoded({extended : true})); // queryString방식으로 데이터 담아오기

app.listen(10002, ()=>{
    console.log('GoGo => http://localhost:10002');
})

app.get('/', (req,res) => {
    res.render('main_ex')  
})

app.get('/member_ex', (req,res)=> {
    let sql = 'SELECT * FROM test'

    db.query(sql, (err,data) => {
        if(err) {console.log(err)}
        res.render('member_ex', {data})
        
    })
})