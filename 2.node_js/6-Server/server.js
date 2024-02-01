//서버 코드 짤 것임

//터미널 열기 단축키 : ctrl +  `
// 패키지 설치 : npm init -y <- 터미널에 입력
// 라이브러리 설치 : npm install express
// 라이브러리 : 클래스의 모음 -> 객체 생성

/*
    객체 사용 : 변수 - 객체명, 변수명
            : 객체명.변수명 = 값
    메서드 - 변수명 = 객체명.변수명(); -- 반환 값이 있는경우
            객체명.변수명(값1, 값2);
*/ 

//라이브러리 불러오는 코드
const express = require('express')
const app = express()

const {MongoClient} = require('mongodb')
//static 파일 경로 등록
app.use(express.static(__dirname + '/public'))

//view engine 지정 - ejs
app.set('view engine', 'ejs')


let db
//몽고디비 데이터베이스에 만들어둔 계정(유저)의 아이디와 비밀번호를 입력해야 한다.
const url = 'mongodb+srv://admin:1111@cluster0.86snijc.mongodb.net/?retryWrites=true&w=majority'
new MongoClient(url).connect().then( (client)=>{
    console.log('db연결 성공!')
    db = client.db('member')//db이름

    //서버를 띄워라
    //app.listen(포트번호, ()=>{ 실행내용 })
    app.listen(8091, ()=> {
        console.log('http://localhost:8091에서 서버 실행중')
    })

}).catch((err)=>{
    console.log(err)
})



//app.get('웹페이지 경로', (요청, 응답)=>{ 실행내용 })
app.get('/'/* '/':메인페이지 */, async(request, response)=>{
    let result = await db.collection('member').find().toArray()
    response.send(__dirname + 'index.html');
    
    //response.sendFile(__dirname + '/ind/ex.html')
})
//라우팅 : 페이지 나누기
app.get('/about'/*원하는 페이지 이름*/, (request, response)=>{
    response.sendFile(__dirname + '/about.html')
})
app.get('/header'/*원하는 페이지 이름*/, (request, response)=>{
    response.sendFile(__dirname + '/header.html')
})
//서버의 절대경로 : __dirname
app.get('/board', async(request, response)=>{
    let result = await db.collection('member').find().toArray()
    
    response.render('board.ejs', {member: result})
})


//mongodb 설치
//npm install mongodb@5

//ejs 설치
//npm install ejs
