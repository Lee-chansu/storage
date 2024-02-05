// 서버 객체
const express = require('express')
const app = express() // app 객체 생성 

// DB 설정
const mysql = require('mysql')
const dbConfig = { // 리터럴 객체에 값을 담아서 정보를 넘겨줌
  host : 'localhost',
  user : 'root',
  password : '1234',
  database : 'mall',
  dateStrings : 'date',
  post : '3306'
}
const db = mysql.createConnection(dbConfig)

// static 파일 경로 등록
app.use(express.static(__dirname + '/public'))
// view engine 지정
app.set('view engine', 'ejs')

// 
app.use(express.json())
app.use(express.urlencoded({extended:true})) 


// 해당포트번호로 접속
app.listen(8080, ()=>{
  console.log('접속 고고! - http://localhost:8080 ')
})

// 매개변수 : 요청(request), 응답(response)
app.get('/', (req, res)=>{
  res.render('main.ejs')  
})

app.get('/member', (req, res) =>{
  
  let sql = 'SELECT * FROM member where gender="f"'
  db.query(sql, (error, rows)=>{ 
    if(error) throw error;  
    res.render('member.ejs', {person : rows})
  })
})

app.get('/shop', (req, res) =>{
  res.render('shop.ejs')
})

app.get('/contact', (req, res) =>{
  res.render('contact.ejs')
})


app.post('/add', (req, res)=>{
  let {name, age} = req.body // 객체로 값이 저장되어 있음
  let values = [name, age]
  
  let sql = 'INSERT INTO test ( name, age) VALUES( ?, ?)'
  
  db.query(sql, values, (error, result)=>{
    
    if(error) throw error;
    console.log('success!')
  })

  console.log(values)

})