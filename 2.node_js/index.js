//서버 객체 생성
const express = require('express');
const app = express() // app 객체 생성

//POST로 파일을 보낼 경우 작성해야 하는 코드
app.use(express.json());
app.use(express.urlencoded({extended : true}));

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

app.post('/add', (req, res)=>{

    console.log(req.body)
    
    let  = req.body;
    let values = [name, age];
    let sql = 'INSERT INTO test (name, age) VALUES(?,?)'
    

    console.log(values);
    db.query(sql, values, (err, result)=>{
        if(err) throw err;
        console.log('success!')

    })
    console.log(name)
    console.log(age)



})