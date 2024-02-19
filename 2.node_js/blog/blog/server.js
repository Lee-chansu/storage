// 1. 모듈 - require
const express = require('express');
const app = express();

//session 모듈
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// db
const db = require('./models');
const {Blog} = db;
const {User} = db;

// 2. use, set - 등록
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(express.json()) // json형태로 데이터 처리
app.use(express.urlencoded({extended : true}))  // queryString 방식의 데이터 처리

// 2-1. session.use 등록 -- 아래의 3가지 순서를 반드시 지켜야 한다!!!
app.use(passport.initialize());
app.use(session({
  secret : '1234',  // 세션문자열 암호화 할때 쓰는 비번, 가능한 길게, 오픈 x
  resave : false,   // 유저가 요청날릴 때마다 session 데이터 갱신할꺼니? (false 추천)
  saveUninitialiezed : false, // 유저가 로그인 안해도 session 저장할거니? (false 추천)
  cookie : {maxAge : 60*60*1000} // (ms 단위로 1000ms : 1s) 즉 여기서 설정한 시간은 1초 * 60 * 60인 1시간이 유효시간임을 나타낸다.
}))
app.use(passport.session());

// 로그인 검증 기능
passport.use(new LocalStrategy(async (username, pw, done)=> {
  let result = await User.findOne({where : {username}})

  if(!result) { 
    return done(null, false, {message : '아이디 db에 없음'})
  } // post의 info에 정보가 담김

  if(result.password != pw) {
    return done(null, false, {message : '비번 불일치'})
  }// post의 info에 정보가 담김
  return done(null, result);  // post의 user에 정보가 담김

}))

// 로그인 - 세션 생성
passport.serializeUser((user, done) => {
  process.nextTick(()=>{
    done(null, {id: user.id, username: user.username})
  })
})

// 유저 접속할 때 - 세션 검사
passport.deserializeUser( async (user, done) => {
  let result = await User.findOne({where: {id: user.id}})
  delete result.password;
  process.nextTick(() => {
    return done(null, result)
  })
})

// 3. listen - 포트번호 지정
app.listen(3000 , ()=>{console.log('접속 성공! - http://localhost:3000 ')})


// 4. 하위페이지들 - 라우팅 
app.get('/', async (req, res)=>{
  res.redirect('/page/1')
})

app.get('/login', async (req, res)=>{
  res.render('login.ejs')
})

app.get('/logout', async (req, res)=>{
  req.logout(() => {
    res.redirect('/login')
  })
})

app.get('/mypage', async(req,res)=>{
  const {username} = req.user;
  res.send(username);
})

app.get('/login/:state', async(req,res)=>{
  let {state} = req.params;
  if(state=='fail'){
    res.render('login-fail.ejs')
  }
})


// 로그인 기능
app.post('/login', (req,res)=>{
  //제출한 아이디, 비밀번호 일치한지 확인하는 코드 => 세션 생성

  passport.authenticate('local', (error, user, info)=>{

    if(error) return res.status(500).json(error); //인증과정에서 오류 발생

    if(!user) return res.redirect('/login/fail')  //-> 로그인 실패했을 때 (아이디 || 비번 안맞을 때)
    
    //  사용자를 로그인 상태로 변경
    //  user, 로그인할 사용자 객체 정보임
    //  err : 에러가 나면 처리할 콜백함수

    req.logIn(user, (err) => {
      console.log(user)
      if(error) return next(err);
      res.redirect('/page/1')
    })

  })(req,res);
})


// 하단의 게시물 페이지 수
app.get('/page/:pageNum', async(req, res) =>{

  const username = req.isAuthenticated() ? req.user.username : false


  let {pageNum} = req.params;
  let limit = 5;
  let offset = (pageNum - 1) * limit;
  let totalPost = await Blog.count();
  let totalPage = Math.ceil(totalPost / limit);
  try {
    //토탈 페이지수 = (전체게시물수 / 페이지당 숫자(limit))
    let blog = await Blog.findAll({
        offset, 
        limit, 
        order : [['createdAt', 'desc']]
      });
  
    res.render('index.ejs', {blog, totalPage, username})
    
  } catch (error) {
    res.status(500).send('서버 오류')
  }
})

app.get('/add', (req, res)=>{
  console.log('add페이지 접속성공!')
})

app.post('/add', async function (req, res) {
  const newPost = req.body // 객체로 받으면 됨
  try{
    await Blog.create(newPost) // db등록
    res.redirect('/')
  } catch{
    res.status(500).send('서버 오류!')
  }
})

app.delete('/:id', async function (req, res) {
  const {id} = req.params; // 객체 안의 파라미터 값을 뽑아야함
  try{
    await Blog.destroy({where : {id}})
    res.redirect('/')
  } catch{
    res.status(500).send('서버 오류!')
  }
})

app.put('/:id', async function (req, res) {
  const {id} = req.params;
  try{
    const newPost = req.body
    const post = await Blog.findOne({where:id})

    Object.keys(newInfo).forEach((prop)=>{
      post[prop] = newPost[prop]
    })
    res.redirect('/')
  } catch{
    res.status(500).send('서버 오류!')
  }
})