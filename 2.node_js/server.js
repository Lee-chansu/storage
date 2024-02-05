//서버 객체 생성
const express = require('express');
const app = express() // app 객체 생성

// static 파일 등록
app.use(express.static(__dirname + '/public'))
//view engine 지정
app.set("veiw engine","ejs");


const mysql = require('mysql');
const dbConfig = { //리터럴 객체
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'mall',
    dateStrings : 'date',
    post : '3306'
}

const db = mysql.createConnection(dbConfig);

//헤딩 포트번호로 접속
app.listen(8082, () => {
    console.log('접속 고고 - http://localhost:8082')
})

//페이지
// 매개변수 : 요청(req), 답변(res)

//ejs파일을 활용할 경우
//1. views라는 파일을 만든다.
//2. ejs파일을 연결할 때 경로를 따로 설정할 필요가 없다.
app.get('/', (req,res) => {
    res.render('main.ejs')
})

app.get('/member', (req,res) => {
    //res.render('파일이름.ejs', {'데이터객체명' : '데이터객체'})
    let sql = 'SELECT * FROM member'

    db.query(sql, (에러, 데이터) => {
        res.render('member.ejs', {person : 데이터})
    })
})
app.get('/shop', (req,res) => {
    res.render('shop.ejs')
})
app.get('/contact', (req,res) => {
    res.render('contact.ejs')
})

app.post('/add', (req,res)=>{
    
})

// 자바스크립트 -- mysql2로 생성하 객체 = (클라이언트 객체 : db) --> mysql db 
// 1) 클라이언트객체를 통해서 dbms로 sql문을 직접 전송해서
// 2) ORM기술을 통해서 자바스ㅡ립트로 작성한 데이터베이스 관련 코드를 SQL 변환해서 DBMS에 전송하여 처리

// SQL을 다뤄주는 ORM 관련 패키지 - 종류가 여러가지 있음.
//npm install sequelize sequelize-c


