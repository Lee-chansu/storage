// 1. 모듈 - require
const express = require('express')
const app = express()

const db = require('./models/index');
const {Member} = db;

// 2. use, set - 등록
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(express.json()) // json형태로 데이터 처리
app.use(express.urlencoded({extended : true}))  // queryString 방식의 데이터 처리

// 3. listen - 포트번호 지정
app.listen(8082 , ()=>{
  console.log('접속 성공! - http://localhost:8082 ')
  console.log('접속 성공! - http://localhost:8082/member ')
})


// 4. 하위페이지들 - 라우팅 

app.get('/', (req, res)=>{
  res.send('메인 접속성공!')
})

app.get('/member', async (req, res)=>{
  //user의 쿼리스트링 추출
  const {team} = req.query;

  //team에 값이 있으면 해당 데이터 조회하여 출력 없으면 전체 출력
  if(team){
    const teamMembers = await Member.findAll({where:{team}})
    res.render('member.ejs', {member:teamMembers})
  }
  else{
    const members = await Member.findAll()
    res.render('members.ejs', {member:members})
  }

})

app.post('/add', async(req, res) => {
  const members = await Member.addHook()
})