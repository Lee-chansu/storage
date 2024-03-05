// 1. 모듈 - require
const express = require('express')
const cors = require('cors');
const app = express()

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const bcrypt = require('bcrypt')

// port 지정
const port = 4000

// 세션 생성하기
// npm install express-mysql-session
const MySQLStore = require("express-mysql-session")(session)
const dbOption = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'blog',
}
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


// sequelize로 설정한 db 불러오기
const db = require('./models')
const {Blog, User} = db


// 2. set 설정
app.set('view engine', 'ejs')

// 2. 미들웨어 등록 - use, set 
app.use(express.static(__dirname + '/public'))
app.use(express.json()) // json형태로 데이터 처리
app.use(express.urlencoded({extended : true}))  // queryString 방식의 데이터 처리
app.use(cors());

// 로그인 - 미들웨어
// 아래 3가지 순서 지킬것 - 초기화, 사용자 인증 요청 처리할수 있도록 함
app.use(passport.initialize()) 
app.use(session({
  secret: '1234567890!@#$%^&*()',
  resave : false, // 
  saveUninitialized : false,
  cookie : {maxAge : 60000 * 1000}, // 1s = 1000ms (쿠키 저장시간 설정) = 1시간
  store : new MySQLStore( dbOption ), // 세션 저장위치
})) // 세션을 사용하기 위한 옵션 설정
app.use(passport.session()) // 세션 사용하도록 설정


// 로그인 검증 - 언제 실행?
passport.use(new LocalStrategy(async (username, pw, done) => {

  let result = await User.findOne({ where : { username : username}})
    
  if (!result) // 찾는게 없으면  rejected = fasle처리 - ! -? true로 바꿔서
    return done(null, false, { message: '아이디 DB에 없음' })

  let validPw = await bcrypt.compare(pw, result.password)
  if (!validPw) 
    return done(null, false, { message: '비번불일치' });
 
  // 정상일 때
  return done(null, result)

}))

// 세션생성
passport.serializeUser( (user, done) =>{
  process.nextTick(() => {
    // 세션 생성할 때 비밀번호가 들어가지 않음, user의 id와 이름만 알려주면 이 정보를 기록해주고
    // 유효기간은 cookie에 생성해준 기간으로 자동으로 생성해서 기록해줌.
    done(null, { id: user.id, username: user.username })
  })
})

// 세션 검사
passport.deserializeUser( async (user, done) => {
  let result = await User.findOne({where : {id : user.id}})
  
  if(result){
    const newUserInfo={
      id : result.id,
      username : result.username
    }
    process.nextTick(() => {
      return done(null, newUserInfo) // done()함수는 자동으로 2번 지정해준 내용이 요청.user의 내용으로 들어간다
    })
  }
})

// 3. listen - 포트번호 지정
app.listen(port , ()=>{
  console.log('접속 성공! - http://localhost:'+port)
})


// 4. 하위페이지들 - 라우팅 
app.get('/', async (req, res)=>{
  try{
    if( await User.count() == 0 ) 
      res.redirect('/join')
    else
      res.redirect('/page/1')
  }catch{
    res.status(500).send('서버 오류!')
  }
})

app.get('/mypage', (req, res)=>{
  const {username} = req.user
  res.send(`${username}`)
})


// router 불러오기
app.use('/', require('./routes/login.js'))
app.use('/', require('./routes/join.js'))
app.use('/', require('./routes/list.js'))
app.use('/', require('./routes/crud.js'))
