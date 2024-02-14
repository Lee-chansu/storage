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

app.get('/addPage', addPageSearch)     // (3)멤버 추가 페이지 보여주기
app.post('/add', memberInsert)     // (3)추가

app.get('/edit-page/:id', updatePage)      // (4)수정 페이지 변환
app.put('/edit/:id', memberUpdate)      // (4)수정

app.delete('/member/:id', memberDelete)   // (5)삭제


// 멤버 조회 - 쿼리스트링 - url : // http://localhost:8082/member?team=aa&position=bb...
async function memberSearchQuery(req,res) {
  const {id} = req.query;
  try {
    const member = await Member.findAll();
    res.render('member.ejs', {member});
    
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

async function addPageSearch(req,res) {
  res.render('add-page.ejs')
}

// 멤버 추가
async function memberInsert(req,res) {
  const newMember = req.body;
  try{
    const member = await Member.create(newMember);
    // const member = Member.build(newMmeber);
    // await member.save();
    res.redirect('/member')
  }catch (error){
    console.log("검색 중 오류 발생", error);
    res.status(500).send('서버 오류 발생');
  }
}

// 수정할 페이지 보여주기
/*
  수정할 페이지를 보여주기 위해서는
  1. 수정할 요소를 입력하는 페이지를 만들어야 한다.
    -> /edit/:id은 수정한 데이터를 넘기는 경로, 수정할 페이지는 /edit-page/:id로 하자. 
  2. 수정한 요소를 받아올 수 있는 방법이 필요하다.
    -> form 태그는 put method로 접근할 수 없으니 fetch로 받아온다.
  3. 수정된 요소를 데이터베이스에 넣어야 한다.
    -> server에서 데이터베이스에 연결한 후 foreach를 통해 요소들을 대입해준다.
  4. 수정된 요소가 반영된 테이블을 출력하도록 코드를 짠다.
    -> fetch 처리 후에 then을 통해 돌아갈 페이지의 주소창을 입력하도록 한다.
*/


//멤버 수정 페이지
async function updatePage(req,res) {
  const {id} = req.params;
  try {
    const member = await Member.findOne({where : {id}})
    if(member){
      res.render('edit.ejs', {member})
    }
    else{
      res.send('값을 찾을 수 없습니다.')
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send('서버 오류 발생');
  }
}

// 멤버 수정 처리
async function memberUpdate(req,res) {
  const {id} = req.params;
  const newInfo = req.body;
  try {
    const member = await Member.findOne({where : {id}});
    Object.keys(newInfo).forEach((prop)=>{
      member[prop] = newInfo[prop]
    })
    await member.save()
    res.redirect('/member')
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