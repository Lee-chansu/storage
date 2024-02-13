// 1. 모듈 - require
const express = require('express');
const app = express();

const db = require('./models/index'); //디렉토리일경우 그 안에 index.js 파일을 불러온다.
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


//API : 어떤 기능들을 처리해주는 단위
app.get('/member', memberSearchQuery) // (1)데이터 조회 - 쿼리스트링
app.get('/member/:id', memberSearchParams)// (2)데이터 조회 - 파라미터
app.post('/add', memberInsert)     // (3)추가
app.put('/edit/:id', memberUpdate)      // (4)수정
app.delete('/member/:id', memberDelete)   // (5)삭제


// 멤버 조회 - 쿼리스트링 - url : // http://localhost:8082/member?team=aa&position=bb...
async function memberSearchQuery(req,res) {
  const {id} = req.query;
  try {
    const member = await Member.findAll()
    res.render('member.ejs', {member})
    
  } catch (error) {
    console.log(error);
    res.status(500).send('서버 오류 발생');
  }
}
// 멤버 조회 - 파라미터 - url : // http://localhost:8082/member/300
async function memberSearchParams(req,res) {
  const {id} = req.params;
  try {
    const member = await Member.findOne({where : {id}})
    if(member){
      res.render('member-detail.ejs', {member})
    }
    else{
      res.send('값을 찾을 수 없습니다.')
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send('서버 오류 발생');
  }

}
// 멤버 추가
async function memberInsert(req,res) {
  const newMmeber = req.body;
  try{
    const member = Member.build(newMmeber);
    await member.save();
    res.render('member.ejs', {member})
  }catch (error){
    console.log(error);
    res.status(500).send('서버 오류 발생');
  }
  
  
  /*
  const member = await Member.create(newMember);
  */



}

// 멤버 수정
async function memberUpdate(req,res) {
  const {id} = req.params;
  const newInfo = req.body;
  try {
    const member = await Member.findOne({where : {id}});
    Object.keys(newInfo).forEach((prop)=>{
      member[prop] = newInfo[prop]
    })
    await member. save()
    res.render('member.ejs',{member})
  } catch (error) {
    console.log(error);
    res.status(500).send('서버 오류 발생');
  }
}

// 멤버 삭제
async function memberDelete(req,res) {
  const {id} = req.params;

  try {
    await Member.destroy({where : {id}});
    res.render('member.ejs', {member})
    
  } catch (error) {
    res.status(500).send('서버 오류 발생');
  }
}

/*
  1. 데이터 받아오기 - query, params, body
  2. 데이터 처리
    - 조회 : db.findAll({where : {값}})
    - 추가 : db.create(객체)
    - 수정 : db.findOne({where : {값}})
            Object.keys(새로운 값).forEach((prop)={
              기존값[prop] = 새로운 값[prop]
            })
            db.save()
    - 삭제 : db.destroy({where : 값})
*/