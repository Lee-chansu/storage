require('dotenv').config() 
const express = require('express')
const app = express()

const methodOverride = require('method-override')

const MongoStore = require('connect-mongo')
const {ObjectId} = require('mongodb')
let connectDB = require('./db.js')
let db 


const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const bcrypt = require('bcrypt') 


connectDB.then((client)=>{
  console.log('DB연결성공-main')
  db = client.db('forum')
  app.listen(process.env.PORT, () => { // DB접속 완료후 서버실행
    console.log(`http://localhost:4000`)
  })
}).catch((err)=>{
  console.log(err)
})

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
// res.body 여기서 데이터 꺼내기 쉽게 처리를 해준다


const sessionOption = {
  secret: 'secret-express-session',
  resave : false,
  saveUninitialized : false,
  cookie : {maxAge : 60 * 60 * 1000 }, // 1시간
  store: MongoStore.create({
    mongoUrl : process.env.URL,
    dbName: 'forum',
  })
}


app.use(passport.initialize())
app.use(session( sessionOption ))
app.use(passport.session()) 


// 아이디, 비번 검사 (미들웨어)
passport.use(new LocalStrategy( {usernameField : 'userid', passwordField : 'password'} ,
  async (userid, password, cb) => {

    let result = await db.collection('user').findOne({ userid })
    
    if (!result) 
      return cb(null, false, { message: '아이디 DB에 없음' })

    if (await bcrypt.compare(password, result.password)) // 같으면 true
      return cb(null, result)
    else 
      return cb(null, false, { message: '비번불일치' });
    
}))

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user._id, userid: user.userid })
  })
})

// 유저가 요청을 할때, 쿠키에 뭐가 있으면 세션 데이터랑 비교
// 이상이 없으면 로그인된 유저정보를 모든 API의 req.user에 담는다.
passport.deserializeUser(async(user, done) => {

  let result = await db.collection('user').findOne({_id : new ObjectId(user.id) })

  delete result.password //password 프로퍼티 삭제

  process.nextTick(() => {
    return done(null, user)
  })
})


//--------------------------------------

app.get('/', (req, res) => {
  res.redirect('/list')
}) 


//--------------------------------------

app.get('/add', async(req, res)=>{
  res.render('write.ejs')
})

app.post('/add', async(req, res)=>{
  
  const {title, content } = req.body

  try {
    if(title == ''){
      res.send('제목이 없습니다')
    } else if( title.length > 20  ){
      res.send('제목의 글자는 20글자 이하입니다')
    } else if (content ==''){
      res.send('내용이 없습니다')
    } else{
  
      let result = await db.collection('post').insertOne({title, content}, (err, r)=>{
        console.log('저장완료')
      })
      res.redirect('/list')
    }
  } catch (err) {
    console.log(err)
    응답.send('DB에러남')
  }

})


// 수정기능

app.get('/edit/:id', async(req, res)=>{

  const {id} = req.params

  let result = await db.collection('post').findOne({_id : new ObjectId(id)})

  res.render('edit.ejs', {result})
})


app.put('/edit', async(req, res)=>{
  
  const {id, title, content} = req.body

  // let result = await db.collection('post').updateOne({수정할부분},{$set : {덮어쓸 내용}})

  try {

    let result = await db.collection('post').updateOne(
      {_id : new ObjectId(id)}, 
      {$set : { title, content}}
    )
    res.redirect(`/list`)

  } catch (error) {
    console.log(error)
  }  
})
  
app.delete('/delete/:id', async(req, res)=>{

  const {id} = req.params

  try {
    let result = await db.collection('post').deleteOne({_id : new ObjectId(id)})
    // fetch로 요청을 한경우에, 새로고침하지 않아야 되기 때문에
    // 서버에 render, redirect 사용x (새로고침함)
    res.send('삭제완료')

  } catch (error) {
    console.log(error)
  }

})


//--------------------------------------


app.get('/join', (req, res)=>{
  res.send('회원가입')
})

app.post('/join', async (req, res) => {

  const {userid, password} = req.body
  let hash = await bcrypt.hash(password, 10)

  await db.collection('user').insertOne({ 
    userid, password : hash
  })
  res.send('등록 성공')
})


//--------------------------------------

app.get('/login', (req, res)=>{
  
  res.render('login.ejs')

})


app.post('/login', async (req, res, next) => {

  passport.authenticate('local', (error, user, info) => {
    if (error) return res.status(500).json(error)
    if (!user) return res.status(401).json(info.message)

   
      
      if (error)return next(err)
     
      req.login(user, (err) => {
        if (err) return next(err)
        res.redirect('/list');
      })

  })(req, res, next)

}) 

app.get('/logout', (req, res)=>{
  req.logout(()=>{
    res.redirect('/')
  })
})


//--------------------------------------


app.get('/list', async(req, res) => {

  const {title} = req.query
  
  let loginInfo 

  if(!req.user){
    loginInfo = { userid : 'null', message : '로그인 해주세요'}
  } else{
    loginInfo = { userid : req.user.userid, message : '님 안녕하세요!'}
  }

  // 타이틀이 포함된 것 찾기 - 정규식 활용
  if(title){
    let result = await db.collection('post').find( { title : { $regex: new RegExp(title)} } ).toArray()
    res.render('list.ejs', { list : result})
  }else{

    let result = await db.collection('post').find().toArray()
    res.render('list.ejs', { list : result, loginInfo})
  }

}) 

// 1개만 조회하기
app.get('/detail/:id', async(req, res)=>{
  
  const {id} = req.params
  
  try {
    let result = await db.collection('post').findOne({ _id : new ObjectId(id) })
    if(result == null)  {
      res.status(400).send('글을 찾을 수 없습니다')
    } else{
      res.render('detail.ejs',{result})
    }

  } catch (error) {
    res.send('오류')
  }
  
})