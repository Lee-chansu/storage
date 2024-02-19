// 1. 모듈 - require
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')

// use 등록 - 아래 3개 순서 지킬것
// 1) 언제 어떻게 세션을 만들지 설정
app.use(passport.initialize())
// 2) 
app.use(session({
  secret : '1234',  // 세션문자열 암호화 할때 쓰는 비번, 가능한 길게, 오픈 x
  resave : false,  // 유저가 로그인 안해도 세션 저장할꺼니? (false 추천)
  saveUninitialized : false, // 유저가 요청날릴 때마다 session데이터 갱신할꺼니(false 추천)
  cookie : {maxAge : 60*60*1000} // 1000ms = 1s - ms단위로 유효기간을 설정 - 1시간 설정
}))
// 3) 
app.use(passport.session())


// 1) 로그인기능 - 검증
// 로그인 하면 서버의 id와 pw를 비교해준다
passport.use(new LocalStrategy( async (id, pw, done)=>{

  let result = await User.findOne({where : {username : id }})

  if(!result){
    return done(null, false, {message : '아이디 db 없음'})
  }

  if(result.password != pw){
    return done(null, false, {message : '비번 불일치'})
  }

  return done(null, result)

}))

// 2) 로그인기능 - 세션 생성 해줌
// req.login() 함수 실행되면 자동으로 동작하는 코드

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user.id, username: user.username })
  })
})

// done() 함수의 2번 파라미터
//    ㄴ 세션 document에 기록되는 정보
//    ㄴ 유효기간 알아서 기록해줌, 유저의 id 또는 username 이런것 적어둠
// user라는 파라미터 = DB에 있는 유저정보 꺼내쓸 수 있음 (new LocalStrategy에서 보내줌)
//    ㄴ 근데 정확히 말하면 아직 passport에 DB연결을 안해놨기 때문에
//    ㄴ 생성된 세션은 - DB말고 컴퓨터 메모리에 저장됨








// 3) 로그인 기능 
// 유저가 서버로 보내준 쿠키를 확인해서
//  ㄴ 세션 있는지? 로그인 잘 되었는지 여부  판단
//  ㄴ 세션 데이터와 비교해보고 이상 없으면 로그인된 유저 정보를 API의 요청. user에 담음

passport.deserializeUser(async (user, done) => {
  
  let result = await User.findOne({ where : { id : user.id}})
  delete result.password // 객체에서 파라미터 지움. password 파라미터 필요없어서 지움
  process.nextTick(() => {
    return done(null, result)
  })
})


// 4. 하위페이지들 - 라우팅 

// 1) 로그인 페이지 접속
app.get('/login', (req, res)=>{
  res.render('login.ejs')
})

// 2) 로그인 실패 
app.get('/login/:state', (req, res)=>{
  let {state} = req.params
  console.log(state)
  if(state == 'fail'){
    res.render('login-fail.ejs')
  }
})

// 3) 로그인기능 - 검증을 하고 결과를 돌려줌.
app.post('/login', (req, res)=>{

  passport.authenticate('local', (error, user, info) => {

    if (error) return res.status(500).json(error)
    if (!user) return res.redirect('/login/fail')

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
콜백함수의 
- 1번 파라미터 : 뭔가 에러시 뭔가 들어옴
- 2번 파라미터 : 아이디/비번 검증 완료된 유저정보가 들어옴
- 3번 파라미터 : 아이디/비번 검증 실패시 에러메세지가 들어옴
*/

// 4) 로그아웃 요청 - 로그인 페이지로 이동
app.get('/logout', (req, res) => {
  req.logout(()=>{
    res.redirect('/login')
  })
  
});

// 5) mypage 접속
app.get('/mypage',  (req, res) => {
  // 로그인한 유저의 아이디를 가져옵니다.
  const {id} = req.user; // 예시로 로그인된 유저의 아이디를 세션에서 가져온다고 가정합니다.
  // 마이페이지 HTML을 렌더링하고 유저 아이디를 출력합니다.
  res.send(`${id}님의 mypage!`);
})

//  6) 기타 - 로그인 되지 않았음 체크 or 로그아웃 되었음 상태 점검
/*
app.get('/', (req, res)=>{
  if (req.isAuthenticated()) {
    // 로그아웃 되었을때
  } else {
    // 로그인x 되었을 때
  }
})
*/
