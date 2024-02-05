// 터미널 열기 단축키 : ctrl + shift + `
// 패키지 설치 :            npm init -y
// express라이브러리 설치 : npm install express
/*
라이브러리 : 클래스의 모음-> 객체 생성
  객체 사용 : 
  변수 - 객체명.변수명
      - 객체명.변수명 = 값
  메서드 - 변수명 = 객체명.변수명();  --- 반환값이 있는 경우
          객체명.변수명();
          객체명.변수명(값1, 값2);
*/
/*
  mongodb 설치
  - npm install mongodb@5
*/

// 라이브러리 불러오는 코드
const express = require('express')
const app = express()

const {MongoClient} = require('mongodb')

// 몽고db 안에서 생성한 user의 아이디/비번을 넣어준다.
// ongodb+srv://DB접속아이디:DB접속비번@cluster0.jea.mongodb.net/?retryWrites=true&w=majority 
let db
const url = 'mongodb+srv://admin:1234@cluster0.3fw2peq.mongodb.net/?retryWrites=true&w=majority'
new MongoClient(url).connect().then( ( client )=>{
  console.log('db연결 성공!')
  db = client.db('member') //db이름

  // db접속 성공후, 서버 실행
  app.listen(8090, ()=>{
    console.log('http://localhost:8090 에서 서버 실행중')
  })
  
}).catch((err)=>{
  console.log(err)
}) 

// static 파일 경로 등록
app.use(express.static(__dirname + '/public'))

// view engine 지정 - ejs
app.set('view engine', 'ejs')

// 서버를 띄워라
// 포트번호가 다른 곳에서 쓰고 있다면 실행이 안될 수 있음. 
// 포트번호를 변경하면 된다. 그리고 localhost 뒤에 포트번호를 내가 지정한 번호로 써준다.
// app.listen(포트번호, ()=>{  //실행내용  })

// app.get('페이지경로', (요청, 응답 )=>{  //실행내용  })

// 라우팅 : 페이지 나누기

app.get('/', (요청, 응답)=>{
  응답.sendFile(__dirname + '/index.html')
})

app.get('/about', (요청, 응답)=>{
  응답.sendFile(__dirname + '/about.html')
})

// 서버의 절대경로 : __dirname
app.get('/board', async(요청, 응답)=>{

  let data = await db.collection('member').find().toArray()

  응답.render('board.ejs', {member : data})
})

