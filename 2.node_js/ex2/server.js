// 작업하려는 폴더 위치를 잘 지정해 놓을것 
// 1. npm init -y  -- packgae.json 파일 생성
// 2. npm install express  -- 익스프레스 라이브라러 설치
// 3. npm install -g nodemon -- nodemon 라이브러리, 서버 재실행x 됨
//   (실행할 때 nodemon server.js  입력 - 파일 저장할 때마다 알아서 서버 재시작)
// 3. 기본 서버 코드 작성
/*
  - express 불러오기 (객체 생성)
  - listen 호출하면서 포트번호 지정
  - get() 메서드 통해서 - 라우팅 (페이지 만들기)
*/

const express = require('express')
const app = express()

app.listen(8080, ()=>{
  console.log('접속 고고! - http://localhost:8080 ')
})

app.get('/', ( request, response )=>{
  response.sendFile(__dirname + '/index.html')
})
app.get('/about', ( request, response )=>{
  response.sendFile(__dirname + '/about.html')
})
app.get('/shop', ( request, response )=>{
  response.sendFile(__dirname + '/shop.html')
})
app.get('/board', ( request, response )=>{
  response.sendFile(__dirname + '/shop.html')
})
