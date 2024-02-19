// 1. 모듈 - require
const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')

// db
const db = require('./models')
const {Blog, User} = db

// 2. use, set - 등록
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.json()) // json형태로 데이터 처리
app.use(express.urlencoded({extended : true}))  // queryString 방식의 데이터 처리


// 아래 3개 순서 지킬것
app.use(passport.initialize()) // 언제 어떻게 세션을 만들지 설정
app.use(session({
  secret : '1234',  // 세션문자열 암호화 할때 쓰는 비번, 가능한 길게, 오픈 x
  resave : false,  // 유저가 로그인 안해도 세션 저장할꺼니? (false 추천)
  saveUninitialized : false, // 유저가 요청날릴 때마다 session데이터 갱신할꺼니(false 추천)
  cookie : {maxAge : 60*60*1000} // 1000ms = 1s - ms단위로 유효기간을 설정 - 1시간 설정
}))
app.use(passport.session())

// 1) 로그인기능 - 검증
passport.use(new LocalStrategy( async (id, pw, done)=>{

  let result = await User.findOne({where : {username : id }})

  if(!result){
    return done(null, false, {message : '아이디 db 없음'})
  }

  if(await bcrypt.compare(result.password,pw)){
    return done(null, result)
  } else{
    return done(null, false, {message : '비번 불일치'})
  }

}))

// 2) 로그인기능 - 세션 생성 해줌
// req.login() 함수 실행되면 자동으로 동작하는 코드

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user.id, username: user.username })
  })
})

// done() 함수의 둘째 파라미터에 적은 정보는 세션 document에 기록됨
// 유효기간 이런건 알아서 기록해주기 때문에 유저의 id 아니면 username 이런걸 적어둠
// user라는 파라미터 출력해보면 DB에 있던 유저정보 꺼내쓸 수 있음 (new LocalStrategy에서 보내줌)
// 근데 정확히 말하면 아직 passport에 DB연결을 안해놨기 때문에 DB말고 컴퓨터 메모리에 세션이 저장됨


// 3) 로그인 기능 - 유저가 서버로 보내준 쿠키를 확인
// 세션 있는지? 로그인 잘 되었는지 여부  판단
// 세션 데이터와 비교해보고 이상 없으면 로그인도니 유저 정보를 API의 요청. user에 담음

passport.deserializeUser(async (user, done) => {
  
  let result = await User.findOne({ where : { id : user.id}})
  delete result.password // 객체에서 파라미터 지움. password 파라미터 필요없어서 지움
  process.nextTick(() => {
    return done(null, result)
  })
})

// function checkLogin(req, res, next){
//   let {username} = req.user
//   if(req.user){
//     console.log('Login! success!!')
//     next()
//   } else{
//     console.log('login error')
//     res.send(`${username}`)
//   }
// }






// 3. listen - 포트번호 지정
app.listen(3000 , ()=>{
  console.log('접속 성공! - http://localhost:3000 ')
})


// 4. 하위페이지들 - 라우팅 

app.get('/', (req, res)=>{
  res.render('login.ejs')
})

app.get('/mypage',  (req, res) => {
  // 로그인한 유저의 아이디를 가져옵니다.
  const {id} = req.user; // 예시로 로그인된 유저의 아이디를 세션에서 가져온다고 가정합니다.
  // 마이페이지 HTML을 렌더링하고 유저 아이디를 출력합니다.
  res.send(`${id}`);
})


// 회원가입
app.get('/join', async (req, res)=>{

  let hash = await bcrypt.hash(req.body.password, 10)  
  let newUser = {
    username : req.body.username,
    password : hash
  }
  await User.create(newUser) // user 테이블에 저장
  
  res.redirect('/')
})

app.post('/login', (req, res)=>{

  passport.authenticate('local', (error, user, info) => {
    if (error) return res.status(500).json(error)
    if (!user) return res.status(401).json(info.message)

    req.logIn(user, (err) => {
      if (err) return next(err)
      res.redirect('/page/1')
    })
  })(req, res)

  
})


  // passport.authenticate('local', 콜백함수)(요청, 응답, next)
  // 이런 코드 작성하면 아까 그 검증하는 코드 실행
  // 검증 성공이나 실패시 뭔가 실행하고 싶으면 콜백함수 안에 작성
  /* 
  - 1번 파라미터 : 뭔가 에러시 뭔가 들어옴
  - 2번 파라미터 : 아이디/비번 검증 완료된 유저정보가 들어옴
  - 3번 파라미터 : 아이디/비번 검증 실패시 에러메세지가 들어옴
  */


app.get('/page/:pageNum', checkLogin, async (req, res)=>{
  
  const {username} = req.user

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
  try{
    await Blog.create(newPost) // db등록
    res.redirect('/page/1')
  } catch{
    res.status(500).send('서버 오류!')
  }

})

app.delete('/:id', async function (req, res) {
  const {id} = req.params // 객체 안의 파라미터 값을 뽑아야함
  try{
    await Blog.destroy({where : {id}})
    res.redirect('/page/1')
  } catch{
    res.status(500).send('서버 오류!')
  }

})

app.put('/:id', async function (req, res) {
  const {id} = req.params
  const newPost = req.body

  try{
    // 원본값 찾기
    const post = await Blog.findOne({where: {id}}) 

    // 내용 바꾸기
    Object.keys(newPost).forEach((prop)=>{
      post[prop] = newPost[prop]
    })
    
    // db저장
    await post.save()

  } catch{
    res.status(500).send('서버 오류!')
  }

})