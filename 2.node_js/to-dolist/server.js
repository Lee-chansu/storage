// 1. 모듈 - require
const express = require('express');
const app = express();

//session 모듈
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// db
const db = require('./models');
const {User, Schedule} = db;

// 2. use, set - 등록
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.json()) // json형태로 데이터 처리
app.use(express.urlencoded({extended : true}));  // queryString 방식의 데이터 처리

app.use(passport.initialize()) 

// 세션을 사용하기 위한 옵션 설정
app.use(session({
  secret: '1234567890!@#$%^&*()',
  resave : false, // 
  saveUninitialized : false,
  cookie : {maxAge : 60 * 60 * 1000} // 1s = 1000ms (쿠키 저장시간 설정) = 1시간
}))

// 세션 사용하도록 설정
app.use(passport.session()) 

// 로그인 검증 - 언제 실행?
passport.use(new LocalStrategy(
  {usernameField:"username",
  passwordField : "password"
},
async (username, pw, done) => {
  console.log(username, pw)
  let result = await User.findOne({ where : { username : username}})
  // 찾는게 없으면  rejected = fasle처리 - ! -? true로 바꿔서
  if (!result) {
    return done(null, false, { message: '아이디 DB에 없음' })
  }

  if (result.password != pw) {
    return done(null, false, { message: '비번불일치' });
  }
  
  return done(null, result)

}))

// 세션 생성
passport.serializeUser( (user, done)=>{
  process.nextTick(()=>{
    done(null, {id : user.id, username : user.name})
  })
})

//세션 검사
passport.deserializeUser(async(user,done)=>{
  let result = await user.findOne({where: {id : user.id}})

  if(result){
    const newUserInfo = {
      id: result.id,
      username : result.username
    }
    process.nextTick(()=>{
      return done(null, newUserInfo)
    })
  }
})


// 3. listen - 포트번호 지정
app.listen(3000 , async()=>{
  console.log('접속 성공! - http://localhost:3000 ')

  await User.findAll()
})


// 4. 하위페이지들 - 라우팅 

//api
app.get('/', toIndexPage); // index.ejs 보여주기

app.get('/login', toLoginPage);  //login.ejs 보여주기
app.post('/login', checkedLogin);  //login 하기
app.get('/login/:state', toLoginFail);  //login.ejs 보여주기

app.get('/join', toJoinPage); //regist.ejs 보여주기
app.post('/join', join); //-회원가입 처리
app.put('/update', updateUser); //회원정보 수정


// app.get('/:id', toIndexLoginPage); // 로그인한 후의 index.ejs 보여주기
app.get('/logout', toLogout);

app.post('/add', add); // to-dolist 등록하기
app.put('/set', );

app.delete('/del/:username', ); // 회원탈퇴
app.delete('/del/:id', );




async function toIndexPage(req,res){res.render('index.ejs')}


async function toLoginPage(req,res){res.render('login.ejs')}
async function toLoginFail(req,res){
  let {state} = req.params;
  if(state == 'fail')
  res.render('login-fail.ejs');
}
async function toJoinPage(req,res){res.render('join.ejs')}
//회원가입
async function join(req, res){
  const newUser = {
    username : req.body.username,
    password : req.body.password,
    phoneNum : req.body.phoneNum
  }
  const result = await User.findOne({where : {username : newUser.username}})
  console.log(result);
  // let isJoined = '';
  // if(result){
  //   isJoined = 'fail'
  // }
  // else{
  //   await User.create(newUser)
  //   isJoined = 'success'
  // }
  // res.render('join.ejs', {isJoined: {message : isJoined}})
}

async function toIndexLoginPage(req,res){
  let {id} = req.params;
  let user = await User.findOne({where : {id: session.id}});

  try {
    if(user.id == id)
    res.render('index-login.ejs', {user});
    else{
      res.redirect('logout');
    }
  } catch (error) {
    res.status(500).send('에러가 발생했습니다.',error)
  }
}

async function toLogout(req,res){
  req.logout(()=>{
    res.redirect('/')
  })
}


// 로그인 db에 있는지 비교 후 로그인
async function checkedLogin(req, res) {
  // 제출한 아이디, 비번이 db에 있는거랑 일치 여부 확인 -> 세션생성
  passport.authenticate('local', (error, user, info)=>{
    
    if (error) return res.status(500).json(error); // 인증과정에서 오류 발생
    
    if (!user) return res.redirect('/login/fail'); // 로그인 실패했을때 (아이디 비번 안 맞아서)

    // 사용자를 로그인 상태로 변경 -  세션 생성
    // user, 로그인할 사용자 객체 정보a임
    // err : 에러가 나면 처리할 콜백함 수
    req.logIn(user, (err) => {  
      if (err) return next(err); // 오류가 나면 next 미들웨어로 오류처리를 넘김  
      console.log('로그인 성공')
      res.redirect('/') // 그게 아니라면 index:id로 이동
    })
  })(req,res)
}

async function add(req, res){
  const newPost = req.body;
  
  await Schedule.create(newPost);
  res.redirect('/login')
}

async function updateUser(req,res){
  const newInfo = req.body;
  const info = await User.findOne({where: {id}})

  newInfo.array.forEach(element => {
    info[element] = newInfo[element]
  });

  res.redirect('/logout')
}