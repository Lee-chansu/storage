// 1. 모듈 - require
const express = require('express')
const app = express()

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')


// db
const db = require('./models')
const {Blog, User} = db

// 2. use, set - 등록
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(express.json()) // json형태로 데이터 처리
app.use(express.urlencoded({extended : true}))  // queryString 방식의 데이터 처리

// 아래 3가지 순서 지킬것

// 초기화, 사용자 인증 요청 처리할수 있도록 함
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
passport.use(new LocalStrategy(async (username, pw, done) => {

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

// 세션생성 - 유저 보내주기 위해
// 세션 생성할 때 비밀번호가 들어가지 않음, user의 id와 이름만 알려주면 이 정보를 기록해주고
// 유효기간은 cookie에 생성해준 기간으로 자동으로 생성해서 기록해줌.
passport.serializeUser( (user, done) =>{
  process.nextTick(() => {    
    done(null, { id: user.id, username: user.username })
  })
})

// 유저 접속할 때 - 세션 검사
passport.deserializeUser( async (user, done) => {
  let result = await User.findOne({where : {id : user.id}})
  
  if(result){
    const newUserInfo={
      id : result.id,
      username : result.username
    }

    process.nextTick(() => {
      return done(null, newUserInfo) 
    })

  }
  
})


// 3. listen - 포트번호 지정
app.listen(3000 , ()=>{
  console.log('접속 성공! - http://localhost:3000 ')
})


// 4. 하위페이지들 - 라우팅 

app.get('/', async (req, res)=>{
  res.redirect('/page/1')
})

app.get('/mypage', (req, res)=>{
  const {username} = req.user
  res.send(`${username}`)
})

app.get('/login', (req, res)=>{
  res.render('login.ejs')
})

app.get('/login/:state', (req, res)=>{
  let {state} = req.params
  if(state== 'fail'){
    res.render('login-fail.ejs')
  }
})

app.get('/logout', (req, res)=>{

    req.logout(()=>{
    res.redirect('/page/1')
  })
})

// 회원가입
app.get('/join', async (req, res)=>{
  res.render('join.ejs', {isJoined : {message : ''}})
})


app.post('/login', (req, res)=>{
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

})


app.get('/page/:pageNum', async (req, res)=>{

  const username = req.isAuthenticated() ? req.user.username : false

  let {pageNum} = req.params
  let limit = 3
  let offset = (pageNum - 1) * limit
  let totalPost = await Blog.count() // select count(*) from blogs
  //  토탈페이지수 = 올림( 전체게시물수 / 페이지당 숫자(limit) )
  let totalPage = Math.ceil( totalPost /limit)

  // 시퀄라이즈 - 정렬, createAt : 내림차순 
  let blog = await Blog.findAll({ 
    offset,
    limit,
    order : [['createdAt','DESC']]
  }) 

  res.render('index.ejs', {blog, totalPage, username})  
  
})


app.post('/add', async function (req, res) {
  const newPost = req.body // 객체로 받으면 됨
  console.log(newPost)
  try{
    await Blog.create(newPost) // db등록
    res.redirect('/')
  } catch{
    res.status(500).send('서버 오류!')
  }
})

app.post('/join', async (req, res)=>{
  // req에 담긴 username과 password로 새로운 객체를 만든다. newUser
  const newUser = {
    username : req.body.username, 
    password : req.body.password
  }
  // db에서 username과 일치하는 username 있는지 검사해서 결과를 result에 받는다
  const result = await User.findOne({where : {username : newUser.username}})
  let isJoined = ''
  if(result){
    isJoined ='fail'
  }else{
    await User.create(newUser)
    isJoined ='success'
  }
  res.render('join.ejs', {isJoined : {message : isJoined}})
  
})


app.delete('/:id', async function (req, res) {
  const {id} = req.params // 객체 안의 파라미터 값을 뽑아야함
  try{
    await Blog.destroy({where : {id}})
    res.redirect('/')
  } catch{
    res.status(500).send('서버 오류!')
  }
})


app.put('/:id', async function (req, res) {
  const {id} = req.params;
  const newPost = req.body;

  try{
    // 원본값 찾기
    const post = await Blog.findOne({where: {id}}) 

    // 내용 바꾸기
    Object.keys(newPost).forEach((prop)=>{
      post[prop] = newPost[prop];
    })
    
    // db저장
    await post.save()

  } catch{
    res.status(500).send('서버 오류!')
  }

})