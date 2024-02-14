const express = require('express')
const app = express()
const db = require('./models')
const member = require('./models/member')
const {Member} = db

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.json()) // json형태로 데이터 처리
app.use(express.urlencoded({extended : true}))  // queryString 방식의 데이터 처리


app.listen(3000 , ()=>{
  console.log('member 접속! - http://localhost:3000')   
})


// 하위페이지들 - 라우팅 
app.get('/', (req, res)=>{
  res.send('메인 접속성공!')
})

// 추가 페이지 조회
app.get('/add-page', memberAddPage) 
async function memberAddPage(req, res) {
  try {
    res.render('add-page.ejs')
  } catch (error) {
    console.error("검색 중 오류 발생:", error);
    res.status(500).send("서버 오류 발생");
  }

}

// 수정 페이지 조회
app.get('/edit-page/:id', memberUpdatePage) 
async function memberUpdatePage(req, res) {
  const {id} = req.params
  try{
    const member = await  Member.findOne({where: {id}})  
    res.render('edit-page.ejs', {member})
  }catch{
    console.error("처리 중 오류 발생:", error);
    res.status(500).send("서버 오류 발생");
  }
  
}

// (문제1) 전체 멤버조회
app.get('/member', async function (req, res) {
  const {team, position} = req.query;
  const {id} = req.query;
  try {
    if(team&&position){
      const member = await Member.findAll({where : {team, position}});
      res.render('member.ejs', {member})
    }
    else if(id){
      const member = await Member.findAll({where : {id}});
      res.render('member.ejs', {member})
    }
    else if(team){
      const member = await Member.findAll({where : {team}});
      res.render('member.ejs', {member})
    }
    else if(position){
      const member = await Member.findAll({where : {position}});
      res.render('member.ejs', {member})
    }
    else{
      const member = await Member.findAll();
      res.render('member.ejs', {member})
    }
  } catch (error) {
    console.error("검색 중 오류 발생:", error);
    res.status(500).send("서버 오류 발생");
  }
  
})

// (문제 2) 상세페이지 멤버조회
app.get('/member/:id', async function (req, res) {
  const {id} = req.params;
  try {
    const member = await Member.findOne({where : {id}});
    res.render('member-detail.ejs', {member});
  } catch (error) {
    console.error("검색 중 오류 발생:", error);
    res.status(500).send("서버 오류 발생");
  }
  
})


// (문제 3) 추가 페이지
app.post('/add', async function (req, res) {
  const newMember = req.body;
  try {
    const member = await Member.create(newMember);
    res.redirect('/member')
  } catch (error) {
    console.error("검색 중 오류 발생:", error);
    res.status(500).send("서버 오류 발생");
  }
  
})


// (문제 4) 멤버 수정 처리
app.put('/edit/:id', async function(req,res) {
  const {id} = req.params;
  const newInfo = req.body;
  try {
    const member = await Member.update(newInfo, {where:{id}})
    res.redirect('/member')
  } catch (error) {
    console.error("검색 중 오류 발생:", error);
    res.status(500).send("서버 오류 발생");
  }
})


// (문제 5) 멤버 삭제 처리
app.delete('/member/:id', async function (req, res) {
  const {id} = req.params;
  try {
    const deleteCount = await Member.destroy({where : {id}});
    console.log(deleteCount);
    res.redirect('/member')
  } catch (error) {
    console.error("검색 중 오류 발생:", error);
    res.status(500).send("서버 오류 발생");
  }
  
})