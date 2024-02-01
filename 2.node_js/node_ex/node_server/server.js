const express = require('express');
const app = express();

const {MongoClient} = require('mongodb');

let db
const url = 'mongodb+srv://admin:1111@cluster0.86snijc.mongodb.net/?retryWrites=true&w=majority';

new MongoClient(url).connect().then( (client)=>{
    console.log('db연결 성공')
    db = client.db('member');

    app.listen(10002,() => {
        console.log('접속완료! - http:// localhost:10002')
    } )
}).catch((err)=>{
    console.log(err)
})



app.get('/',  async(request,response)=>{
    let result = await db.collection('member').find().toArray();
    let str = ''
    for(let i of result){
        str += `${i.name} / ${i.age} / ${i.email}`
    }
    response.send(str);
    //response.send('해윙!~')
})

app.get('/shop',  (request,response) => {
    response.sendFile(__dirname+'/shop.html')
})

//작업하려는 폴더 위치를 잘 지정해놓을 것 
/*
    1. npm init -y : package.json 파일 생성
    2. npm install express - express 라이브러리 설치
    3. npm install -g nodemon -- nodemon 라이브러리, 서버 재실행x 됨
    (실행할 때 nodemon server.js 입력 - 파일 저장할때마다 알아서 서버 재시작) 
    4. 노드몬 실행 nodemon 메인서버명.js
*/