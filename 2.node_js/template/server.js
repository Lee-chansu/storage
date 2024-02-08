// express 라이브러리 준비
const express = require('express');
const app = express();

// Sequrelize(ORM)을 통한 db 설정 준비
const db = require('./models/index');
const {Member} = db;

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
app.get('/members', async (req,res)=>{
    const {team} = req.query;

    const members = await Member.findAll() // .findAll() = select * from 테이블명 where team = ?
    res.render('members', {members})

    // = select * from members where team = 'engineering'
    if(team) {
        const teamMembers = await Member.findAll({where : {team}}) //팀 데이터만 출력
        res.render('members', {teamMembers})
    }
    else{
        const members = await Member.findAll() //전체 데이터 출력
        res.render('members', {members})
    }


})
app.post('/members/:id', async (req,res)=>{
    
})