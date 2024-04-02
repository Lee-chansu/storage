const express = require("express");
const app = express();

const port = 4000;

//리퀘스트가 라우트 핸들러에 의해 처리되기 이전에
//추가적으로 필요한 작업을 하는 것
// = 전처리기를 수행하는 함수들
// 익스프레스에서는 미들웨어라고 함.
app.use(express.json());

//json 데이턱라 들어오면 req객체의 body 프로퍼티에 설정되고
//그 다음에 리퀘스트의 path와 method를 보고 알맞은 라우터 핸들로호출

let members = require("./members.js");

app.listen(port, () => {
  console.log("접속 완료 - http://localhost:4000/");
});

//콜백함수 - 라우팅
app.get("/", (req, res) => {
  res.send("<h1>메인페이지입니다.</h1>");
});

// app.get("/api/members/", (req, res) => {
//   res.send(members);
// });

//특정 파라미터로 검색 기능 구현 가능(req.params or req.query)
app.get("/api/members/:id", (req, res) => {
  const { id } = req.params;
  //members의 전체 데이터를 순회한 후
  //각 데이터를 m에 받는다.
  //m(객체)의 프로퍼티 id 값과 api에서 받아온 id 중에 일치한 것이 있는지 확인
  const member = members.find(m => m.id === Number(id));
  console.log("find: " + member);
  //있으면 데이터를 출력.
  if (member) {
    res.send(member);
  } else {
    res.status(400);
  }
});

//쿼리스트링
//team으로 검색
// /api/members?team=engineering
//위의 데이터만으로 검색 되도록 코드 작성
app.get("/api/members", (req, res) => {
  //find() - 조건을 만족하는 첫번째 요소만 반환.
  //filter() - 조건에 만족하는 모든 데이터 찾아서 새로운 배열 - 결과물 여러개 가능
  //해당 id 데이터 검색할 때 : find
  //여러개의 결과를 검색해야 할 때 filter
  const { team, position } = req.query;

  try {
    if (!team && !position) {
      res.status(400);
    }

    if (team) {
      const teamMember = members.filter(m => m.team == team);
      res.send(teamMember);
    } else if (position) {
      const positionMember = members.filter(m => m.position == position);
      res.send(positionMember);
    } else {
      res.send(members);
    }
  } catch (error) {
    res.status(400).send("404 error!");
  }
});

app.post("/api/members", (req, res) => {
  // console.log(req.body)
  const newMember = req.body;
  members.push(newMember);
  res.send(newMember);
});

app.put("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;

  const member = members.find(m => m.id === Number(id));

  if (member) {
    //객체의 key를 (프로퍼티) 순회한다.
    Object.keys(newInfo).forEach(prop => {
      member[prop] = newInfo[prop];
      //프로퍼티가 같은 값을 newInfo에서 뽑아서
      res.send(member);
    });
  } else {
    res.status(404).send({ message: "There is no member with the Id!" });
  }
});

app.delete("/api/members/:id", (req, res) => {
  const { id } = req.params;

  const memberCount = members.length;

  //id와 일치하지 않는 데이터들만으로 새로운 배열을 만듦
  members = members.filter(m => m.id !== Number(id));

  if (members.length < memberCount) {
    res.send({ message: "Deleted" });
  } else {
    res.status(404).send({ message: "There is no member with the Id!" });
  }
});
