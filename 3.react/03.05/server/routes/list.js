const router = require('express').Router()
const db = require('../models'); // models 폴더에서 모델을 불러옴
const { Blog, User } = db; // User 모델을 사용하기 위해 불러옴

router.get('/page/:pageNum', async (req, res)=>{

  // 로그인한 사용자의 user테이블의 username, id 저장 (로그인 여부가 체크됨)
  const loginUserName = req.isAuthenticated() ? req.user.username : false // 로그인한 사용자 이름
  const loginUserId = req.isAuthenticated() ? req.user.id : false // 로그인한 사용자 고유번호
  
  const queryUserId = req.query.userid // user 조회
  
  const {pageNum} = req.params //페이지번호

  let limit = 3 
  let offset = (pageNum - 1) * limit
  
  // 조회조건 생성
  let query = (queryUserId && loginUserId) ? 
    { // 로그인 유저만 검색
      include: [{ model: User, attributes: ['username'] } ],
      where : {user_id : loginUserId },
      offset, 
      limit, 
      order: [['createdAt', 'DESC']]
    } : { 
      // 전체검색
      include: [{ model: User, attributes: ['username'] } ],
      offset, 
      limit, 
      order: [['createdAt', 'DESC']]
    }

  try{
    const result = await Blog.findAndCountAll(query)
    const blog = result.rows
    const totalPage = Math.ceil( result.count /limit)
    res.render('index.ejs', {blog, totalPage, loginUserName, loginUserId, queryUserId})  
  } catch{
    res.status(500).send('서버 오류!')
  }
})

module.exports = router 