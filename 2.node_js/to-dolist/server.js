// 1. 모듈 - require
const express = require('express');
const app = express();

//session 모듈
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// db
const db = require('./models');


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
async (username, password, done) => {
  console.log(username, password)
  let result = await db.user.findOne({ where : { username : username}})
  // 찾는게 없으면  rejected = fasle처리 - ! -? true로 바꿔서
  if (!result) {
    return done(null, false, { message: '아이디 DB에 없음' })
  }

  if (result.password != password) {
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
  let result = await db.user.findOne({where: {id : user.id}})

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

})


// 4. 하위페이지들 - 라우팅 

//api
app.get('/', toIndexPage); // index.ejs 보여주기

app.get('/login', toLoginPage);  //login.ejs 보여주기
app.post('/login', login);  //login 하기
app.get('/login/:state', toLoginFail);  //login.ejs 보여주기

app.get('/join', toJoinPage); //regist.ejs 보여주기
app.post('/join', join); //-회원가입 처리
app.put('/update', updateUser); //회원정보 수정


app.get('/:id', toIndexLoginPage); // 로그인한 후의 index.ejs 보여주기
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
  const result = await db.user.findOne({where : {username : newUser.username}})
  let isJoined = '';
  if(result){
    isJoined = 'fail'
    res.render('join.ejs')
  }
  else{
    await db.user.create(newUser)
    isJoined = 'success'
    res.redirect('/:id')
  }
}

// 로그인 후 스케줄러 페이지(get)
async function toIndexLoginPage(req,res){
  let {id} = req.params;
  let user = await db.user.findOne({where : {id}});
  if(!req.user){
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
    res.write("<script>alert('로그인이 필요한 서비스입니다.')</script>")
    res.write("<script>location.href='/login'</script>")
    return;
  }
  else if(req.user.id != id){
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
    res.write("<script>alert('잘못된 url입니다.')</script>")
    res.write(`<script>location.href='/${req.user.id}'</script>`)
    return;
  }
  try {
    let schedule = await db.schedule.findAll({where : {user_id: user.id}});

    if(user.id == id)
    res.render('index-login.ejs', {user, schedule});
    else{
      res.redirect('logout');
    }
  } catch (error) {
    res.status(500).send('에러가 발생했습니다.', error)
  }  

}

// 로그아웃(get)
async function toLogout(req,res){
  req.logout(()=>{
    res.redirect('/')
  })
}


// 로그인 기능(post)
async function login(req, res) {
  // 제출한 아이디, 비번이 db에 있는거랑 일치 여부 확인 -> 세션생성
  passport.authenticate('local', (error, user, info)=>{
    
    if (error) return res.status(500).json(error); 
    
    if (!user) return res.redirect('/login/fail'); 

    req.logIn(user, (err) => {  
      if (err) return next(err); 
      res.redirect('/' + user.id)
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
  const info = await db.user.findOne({where: {id}})

  newInfo.array.forEach(element => {
    info[element] = newInfo[element]
  });

  res.redirect('/logout')
}