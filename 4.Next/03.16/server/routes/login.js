const passport = require('passport'); // passport 모듈을 불러옴
const router = require('express').Router()

// 로그인
router.get('/login', (req, res)=>{
  res.render('login.ejs')
})

router.get('/login/:state', (req, res)=>{
  let {state} = req.params
  if(state== 'fail'){
    res.render('login-fail.ejs')
  }
})

router.post('/login', login)
function login(req, res){
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

// 로그아웃
router.get('/logout', (req, res)=>{
  req.logout(()=>{
    res.redirect('/page/1')
  })
})


module.exports = router