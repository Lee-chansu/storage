// 1. 모듈 - require
const express = require('express')
const app = express()

//session 모듈
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// db
const db = require('./models');
const {User} = db;
const {Schedule} = db;

// 2. use, set - 등록
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(express.json()) // json형태로 데이터 처리
app.use(express.urlencoded({extended : true}))  // queryString 방식의 데이터 처리

app.use(passport.initialize());

app.use(session({
  secret: '1234567890!@#$%^&*()',
  resave : false, // 
  saveUninitialized : false,
  cookie : {maxAge : 60 * 60 * 1000}
}))

app.use(passport.session());

passport.use(new LocalStrategy(async (username, pw, done) => {
  let result = await User.findOne({where : {username}})

  if(!result) {
    return done(null, false, {message: '아이디 db에 없음'})
  }
  if(!result.password != pw) {
    return done(null, false, {message : '비번 불일치'})
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
  let result = await User.findOne({where: {id : user.id}})

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
app.listen(3000 , ()=>{
  console.log('접속 성공! - http://localhost:3000 ')
})


// 4. 하위페이지들 - 라우팅 

//api
app.get('/', toIndexPage); // index.ejs 보여주기

app.get('/login', toLoginPage);  //login.ejs 보여주기

app.get('/join', toJoinPage); //regist.ejs 보여주기
app.post('/join', checkedLogin); //-회원가입 처리


app.post('/regist', ) // to-dolist 등록하기

app.put('/set', );
app.delete('/del/:username', ); // 회원탈퇴
app.delete('/del/:id')




async function toIndexPage(req,res){
  res.render('index.ejs')
}
async function toLoginPage(req,res){
  res.render('login.ejs')
}
async function toJoinPage(req,res){
  res.render('join.ejs')
}



async function checkedLogin(req, res) {
  // 제출한 아이디, 비번이 db에 있는거랑 일치 여부 확인 -> 세션생성
  
  passport.authenticate('local', (error, user, info)=>{
    
    if (error) return res.status(500).json(error) // 인증과정에서 오류 발생
    
    if (!user) return res.redirect('/login/fail') // 로그인 실패했을때 (아이디 비번 안 맞아서)

    // 사용자를 로그인 상태로 변경 -  세션 생성
    // user, 로그인할 사용자 객체 정보임
    // err : 에러가 나면 처리할 콜백함 수
    req.logIn(user, (err) => {  
      if (err) return next(err) // 오류가 나면 next 미들웨어로 오류처리를 넘김  
      res.redirect('/page/1') // 그게 아니라면 /page/1 경로로 이동
    })
  })(req,res)

}