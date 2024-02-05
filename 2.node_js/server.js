//서버 객체 생성
const express = require('express');
const app = express() // app 객체 생성

// static 파일 등록
app.use(express.static(__dirname + '/public'))
//view engine 지정
app.set("veiw engine","ejs");


const mysql = require('mysql');
const dbConfig = { //리터럴 객체
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'mall',
    dateStrings : 'date',
    post : '3306'
}

const db = mysql.createConnection(dbConfig);

//헤딩 포트번호로 접속
app.listen(8082, () => {
    console.log('접속 고고 - http://localhost:8082')
})

//페이지
// 매개변수 : 요청(req), 답변(res)

//ejs파일을 활용할 경우
//1. views라는 파일을 만든다.
//2. ejs파일을 연결할 때 경로를 따로 설정할 필요가 없다.
app.get('/', (req,res) => {
    res.render('main.ejs')
})

app.get('/member', (req,res) => {
    //res.render('파일이름.ejs', {'데이터객체명' : '데이터객체'})
    let sql = 'SELECT * FROM member'

    db.query(sql, (에러, 데이터) => {
        res.render('member.ejs', {person : 데이터})
    })
})
app.get('/shop', (req,res) => {
    res.render('shop.ejs')
})
app.get('/contact', (req,res) => {
    res.render('contact.ejs')
})

app.post('/add', (req,res)=>{
    let values = Object.values(req.body);
    let query ='INSERT INTO test VALUES (?, ?)';
    
    db.query(sql, values, (err, result) => {
        console.log('success')
    })
})

// 자바스크립트 -- mysql2로 생성하 객체 = (클라이언트 객체 : db) --> mysql db 
// 1) 클라이언트객체를 통해서 dbms로 sql문을 직접 전송해서
// 2) ORM기술을 통해서 자바스ㅡ립트로 작성한 데이터베이스 관련 코드를 SQL 변환해서 DBMS에 전송하여 처리

// SQL을 다뤄주는 ORM 관련 패키지 - 종류가 여러가지 있음.
//npm install sequelize sequelize-c


/*npm과 npx의 차이점
    npm : 모듈 패키지를 로컬에 설치
    package.json 파일에 의존성 정보 기록
    모듈이 업데이트되었는지 확인x
    create-react-app 같은 모듈 - 변경사항이 잦은 모듈의 경우 매번 npm으로 버전을 새로 설치해야 한다.


    npx : 패키지를 실행, 관리하는데 사용
    - 로컬에 설치된 패키지를 직접 실행할 때 유용, 일회성 명령어
    - 로컬에 설치않되도 npm 레지스트리에서 패키지를 다운로드하여 실행 가능, 그냥 실행X, 입력한 패키지를 가지고 
    - 특정 버전의 패키지 사용, 다른 환경변수 설정하여 실행
    - 매번 최신 버전을 가져와서 설치해줌.
*/

//npx sequelize model:generate --name Member --attributes name:string,team:string,position:string,emailAddress:string,phoneNumber:string,admissionDate:date,birthday:date,profileImage:string
//--> sql쿼리문에서 테이블을 생성하는 명령문에 해당함(실제db에 아직 만들어지기 전 단계)

//npx sequelize db:migrate --> 실제 db에 실행하도록 만듦