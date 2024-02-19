// 1. 모듈 - require
const express = require('express')
const app = express();

// db
const db = require('./models/index');
const {Blog} = db;

// 2. use, set - 등록
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(express.json()) // json형태로 데이터 처리
app.use(express.urlencoded({extended : true}))  // queryString 방식의 데이터 처리

// 3. listen - 포트번호 지정
app.listen(3000 , ()=>{
  console.log('접속 성공! - http://localhost:3000 ')
  console.log('접속 성공! - http://localhost:3000/blog ')
})


// 4. 하위페이지들 - 라우팅 

app.get('/', (req, res)=>{
  res.send('메인 접속성공!')
})
// 블로그 게시물 확인
app.get('/blog', async (req, res)=>{

  try {
    const blog = await Blog.findAll();
    res.render('index.ejs', {blog})
  } catch (error) {
    console.log(error);
    res.status(500).send('서버 오류 발생');
  }
  
})
// 추가 페이지 작성
app.get('/add-page', async (req, res)=>{
  res.render('add-page.ejs')
})

// 수정 페이지 작성
app.get('/blog:id', async(req,res)=>{
  let {id} = req.params;
  const blog = await Blog.findOne({where : {id}})
  res.render('blog-detail.ejs', {blog})
})


// 추가
app.post('/add', async (req,res) => {
  const info = req.body;
  await Blog.create(info)
  res.redirect('/blog')
  
})


//삭제
app.delete('/blog:id', async (req,res) =>{
  const {id} = req.params
  try {
    await Blog.destroy({where: {id}});
    res.redirect('/blog')
  } catch (error) {
    console.log(error);
    res.status(500).send('서버 오류 발생');
    
  }
})