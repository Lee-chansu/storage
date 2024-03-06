const router = require('express').Router()
const bcrypt = require('bcrypt')

const db = require('../models'); // models 폴더에서 모델을 불러옴
const { Blog, User } = db; // User 모델을 사용하기 위해 불러옴

// 회원가입
router.get('/join', async (req, res)=>{
  res.render('join.ejs', {isJoined : {message : ''}})
})

router.post('/join', async (req, res)=>{
  // req에 담긴 username과 password로 새로운 객체를 만든다. newUser
  const newUser = {
    username : req.body.username, 
    password : await bcrypt.hash(req.body.password, 10) 
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

module.exports = router 