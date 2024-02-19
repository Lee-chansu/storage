// 1. 모듈 - require
const express = require('express')
const app = express()

// db
const db = require('./models')
const {Blog} = db

// 2. use, set - 등록
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(express.json()) // json형태로 데이터 처리
app.use(express.urlencoded({extended : true}))  // queryString 방식의 데이터 처리

// 3. listen - 포트번호 지정
app.listen(3000 , ()=>{
  console.log('접속 성공! - http://localhost:3000 ')
})


// 4. 하위페이지들 - 라우팅 

app.get('/', async (req, res)=>{
  res.redirect('/page/1')
})

app.get('/page/:pageNum', async (req, res)=>{
  
  let {pageNum} = req.params
  let limit = 3
  let offset = (pageNum - 1) * limit
  let totalPost = await Blog.count() // select count(*) from blogs
  //  토탈페이지수 = 올림( 전체게시물수 / 페이지당 숫자(limit) )
  let totalPage = Math.ceil( totalPost /limit)

  console.log(totalPost, totalPage)
  
  // 시퀄라이즈 - 정렬, createAt : 내림차순 
  let blog = await Blog.findAll({ 
    offset,
    limit,
    order : [['createdAt','DESC']]
  }) 
  res.render('index.ejs', {blog, totalPage})
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