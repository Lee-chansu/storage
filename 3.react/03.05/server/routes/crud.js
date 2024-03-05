const router = require('express').Router()
const db = require('../models'); // models 폴더에서 모델을 불러옴
const { Blog, User } = db; // User 모델을 사용하기 위해 불러옴


// 추가
router.post('/add', async function (req, res) {
  // 객체로 받으면 됨
  // const user_id = req.isAuthenticated() ? req.user.id : false
  
  // if(!user_id)  return res.status(500).send('서버 오류!')
  
  const newPost = {
    user_id : 1,
    title : req.body.title,
    content : req.body.content
  } 

  try{
    await Blog.create(newPost) // db등록
    res.redirect('/')
  } catch{
    res.status(500).send('서버 오류!')
  }

})

// 수정
router.put('/:id', async function (req, res) {
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

// 삭제
router.delete('/:id', async function (req, res) {
  const {id} = req.params // 객체 안의 파라미터 값을 뽑아야함
  try{
    await Blog.destroy({where : {id}})
    res.redirect('/')
  } catch{
    res.status(500).send('서버 오류!')
  }
})


module.exports = router 