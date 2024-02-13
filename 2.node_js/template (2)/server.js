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

app.get('/insert', (req, res) => {
  res.render('insert')
})

// 쿼리스트링 - 전체 데이터 조회
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
    res.render('member.ejs', {member:members})
  }

})
// 파라미터로 - 데이터 조회
app.get('/member/:id', async(req,res)=>{
  const {id} = req.params;
  const member= await Member.findAll({where : {id}}) 
  //한개씩 값을 찾을 때 -findOne
  if(member){
    res.render('member',{member : member})
  }
  else{
    res.status(404).send({message : 'I cannot search!'})
  }
})


// 데이터 추가
app.post('/member', async(req, res) => {
  // const newMember = req.body; 
  // //req.body에서 받아온 내용을 newMember에 저장 (form에서 직원정보 받아온 것이 req.body에 담김)
  // const member = Member.build(newMember); //
  // await member.save() //새로운
  // res.render('member', {member});

  // case2
  const newMmeber = req.body
  const member = await Member.create(newMmeber) // build() + save()
  res.redirect('member');


})
/*
  http://localhost:8082/member?name=hong&age=30

  req.body = queryString로 들어온 데이터가 객체형태로 저장이 되어 있음
  newMember에 저장
  Member모델과 연결된 테이블에 들어갈 수 있는 형태로 build해준다.
  member 저장 ( = 테이블에 row 추가)
*/

// app.put('/member/:id', async(req,res)=>{

//   const {id} = req.params;
//   const newInfo = req.body;
//   const result =  await Member.update(newInfo, {where : {id}}) 

//   if(result[0]){
//     res.send({message : `${result[0]} row(s) affeted`})
//   }
//   else{
//     res.status(404).send({message : 'I cannot search!'})
//   }
// })

app.put('/member/:id', async(req,res)=>{
  const {id} = req.params;
  const newInfo = req.body
  const member = await Member.findOne({where : {id}})

  Object.keys(newInfo).forEach((prop)=>{
    member[prop] = newInfo[prop]
  })

  await member.save()
  res.send(member)

})

//찾는 id 값이 있다면 첫번째 데이터니까 0번지의 데이터임
//그래서 result[0] ===찾는 데이터가 있다.
app.delete('/member/:id', async(req,res)=>{
  const {id} = req.params;
  const deleteCount = await Member.destroy({where : {id}});
  //destroy : mysql에서 delete와 같은 명령이다.
  if(deleteCount){
    res.send({message : ` ${deleteCount} row(s) Deleted`})
  }
  else{
    res.status(404).send({message : 'i connot find the id'})
  }
})


