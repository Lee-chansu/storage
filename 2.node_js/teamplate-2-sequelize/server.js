// 1. 모듈 - require
const express = require('express');
const app = express();

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// db
const db = require('./models/');
const {User} = db;
console.log(User);

// 2. use, set - 등록
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.json()) // json형태로 데이터 처리
app.use(express.urlencoded({extended : true}));  // queryString 방식의 데이터 처리
app.use(passport.initialize());

// 세션을 사용하기 위한 옵션 설정
app.use(session({
  secret: '1234567890!@#$%^&*()',
  resave : false, // 
  saveUninitialized : false,
  cookie : {maxAge : 60 * 60 * 1000} 
}))

// 세션 사용하도록 설정
app.use(passport.session()) 

// 로그인 검증 - 언제 실행?
passport.use(new LocalStrategy(
  {usernameField:"username",
  passwordField : "password"},
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
    done(null, {id : user.id, username : user.username})
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
app.listen (3000 , async ()=>{
  console.log('접속 성공! - http://localhost:3000')

  // await User.findAll({});
})

// 4. 하위페이지들 - 라우팅 
app.get('/', (req, res)=>{
  res.send('메인 접속성공!')
})

app.get('/add', (req, res)=>{
  console.log('add페이지 접속성공!')
})