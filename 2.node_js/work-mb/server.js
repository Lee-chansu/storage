require("dotenv").config();
const express = require("express");
const app = express();

const methodOverride = require("method-override");

//채팅기능
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server);

const MongoStore = require("connect-mongo");
const { ObjectId } = require("mongodb");
let connectDB = require("./db.js");
let db;

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const bcrypt = require("bcrypt");

connectDB
  .then(client => {
    console.log("DB연결성공-main");

    db = client.db("forum");
    server.listen(process.env.PORT, () => {
      // DB접속 완료후 서버실행
      console.log(`http://localhost:4000`);
    });
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// res.body 여기서 데이터 꺼내기 쉽게 처리를 해준다

const sessionOption = {
  secret: "secret-express-session",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }, // 1시간
  store: MongoStore.create({
    mongoUrl: process.env.URL,
    dbName: "forum",
  }),
};

app.use(passport.initialize());
app.use(session(sessionOption));
app.use(passport.session());

// 아이디, 비번 검사 (미들웨어)
passport.use(
  new LocalStrategy(
    { usernameField: "userId", passwordField: "password" },
    async (userId, password, cb) => {
      let result = await db.collection("user").findOne({ userId });

      if (!result) return cb(null, false, { message: "아이디 DB에 없음" });

      if (await bcrypt.compare(password, result.password))
        // 같으면 true
        return cb(null, result);
      else return cb(null, false, { message: "비번불일치" });
    }
  )
);

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user._id, userId: user.userId });
  });
});

// 유저가 요청을 할때, 쿠키에 뭐가 있으면 세션 데이터랑 비교
// 이상이 없으면 로그인된 유저정보를 모든 API의 req.user에 담는다.
passport.deserializeUser(async (user, done) => {
  let result = await db
    .collection("user")
    .findOne({ _id: new ObjectId(String(user.id)) });

  delete result.password; //password 프로퍼티 삭제

  process.nextTick(() => {
    return done(null, user);
  });
});

//--------------------------------------

app.get("/", (req, res) => {
  res.redirect("/list");
});

//--------------------------------------

app.get("/add", async (req, res) => {
  let loginInfo;

  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요" };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요!" };
  }

  res.render("write.ejs", { loginInfo });
});

app.post("/add", async (req, res) => {
  const { title, content } = req.body;
  const { id, userId } = req.user;

  if (!req.user) {
    res.send("로그인해주세요");
  }

  try {
    if (title == "") {
      res.send("제목이 없습니다");
    } else if (title.length > 20) {
      res.send("제목의 글자는 20글자 이하입니다");
    } else if (content == "") {
      res.send("내용이 없습니다");
    } else {
      let result = await db
        .collection("post")
        .insertOne({ title, content, userNum: id, userId }, (err, r) => {
          console.log("저장완료");
        });
      res.redirect("/list");
    }
  } catch (err) {
    console.log(err);
    응답.send("DB에러남");
  }
});

// 수정기능

app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  let loginInfo;

  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요" };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요!" };
  }

  let result = await db.collection("post").findOne({ _id: new ObjectId(id) });

  res.render("edit.ejs", { result, loginInfo });
});

app.put("/edit", async (req, res) => {
  const { id, title, content } = req.body;

  // let result = await db.collection('post').updateOne({수정할부분},{$set : {덮어쓸 내용}})

  try {
    let result = await db
      .collection("post")
      .updateOne(
        { _id: new ObjectId(String(id)) },
        { $set: { title, content } }
      );
    res.redirect(`/list`);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const post_id = req.params.id;
  const userNum = req.user.id;

  try {
    let result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(post_id), userNum });
    // fetch로 요청을 한경우에, 새로고침하지 않아야 되기 때문에
    // 서버에 render, redirect 사용x (새로고침함)
    res.send("삭제완료");
  } catch (error) {
    console.log(error);
  }
});

//--------------------------------------

app.get("/join", (req, res) => {
  res.render("join.ejs");
});

app.post("/join", async (req, res) => {
  const { userId, password } = req.body;
  let hash = await bcrypt.hash(password, 10);

  await db.collection("user").insertOne({
    userId,
    password: hash,
  });
  res.redirect("/login");
});

//--------------------------------------

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return res.status(500).json(error);
    if (!user) return res.status(401).json(info.message);

    if (error) return next(err);

    req.login(user, err => {
      if (err) return next(err);
      res.redirect("/list");
    });
  })(req, res, next);
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

//--------------------------------------

app.get("/list", async (req, res) => {
  const { title } = req.query;
  let loginInfo;

  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요" };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요!" };
  }

  // 타이틀이 포함된 것 찾기 - 정규식 활용
  if (title) {
    let result = await db
      .collection("post")
      .find({ title: { $regex: new RegExp(title) } })
      .toArray();
    res.render("list.ejs", { list: result, loginInfo });
  } else {
    let result = await db.collection("post").find().toArray();
    res.render("list.ejs", { list: result, loginInfo });
  }
});

// 1개만 조회하기
app.get("/detail/:id", async (req, res) => {
  const { id } = req.params;

  let loginInfo;

  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요" };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요!" };
  }

  try {
    let result = await db.collection("post").findOne({ _id: new ObjectId(id) });
    let comment = await db.collection("comment").find({ parentId: id });

    if (result == null) {
      res.status(400).send("글을 찾을 수 없습니다");
    } else {
      res.render("detail.ejs", { result, loginInfo, comment });
    }
  } catch (error) {
    res.send("오류");
  }
});

//코멘트 달기

app.post("/comment", async (req, res) => {
  const { content, parentId } = req.body;
  const writerId = req.user.id;
  const wrtier = req.user.userId;
  let result = await db.collection("comment").insertOne({
    content,
    parentId, // post 컬렉션 _id 게시글 아이디
    writerId, // 로그인한 사람의 _id(현재 로그인 사용자)
    wrtier,
  });

  res.redirect("back"); // 이전 페이지 돌아가기
});

// 채팅 요청,
//채팅하기 누르면, 채팅정보를 컬렉션에 저장 <- 채팅 참여자 리스트, 날짜
app.get("/chat/request", async (req, res) => {
  let loginInfo;
  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요" };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요!" };
  }
  await db.collection("chatroom").insertOne({
    member: [req.user.id, new ObjectId(req.query.writerId)],
    date: new Date(),
  });
  res.redirect("/chat/list");
});

//채팅방 목록 보여주기
app.get("/chat/list", async (req, res) => {
  let loginInfo;

  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요" };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요!" };
  }
  //현재 로그인한 사용자의 채팅방 목록 검색해서 출력한다.
  let result = await db
    .collection("chatroom")
    .find({ member: req.user.id })
    .toArray();
  res.render("chatList.ejs", { result, loginInfo });
});

//채팅방 내용 확인하기
app.get("/chat/detail/:id", async (req, res) => {
  const { id } = req.params;
  let loginInfo;

  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요" };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요!" };
  }

  let result = await db
    .collection("chatroom")
    .findOne({ _id: new ObjectId(id) });

  res.render("chatDetail.ejs", { result, loginInfo });
});

io.on("connection", socket => {
  console.log("websocket 연결됨");
  //실행할 코드

  socket.on("ask-join", async data => {
    socket.join(data);
  });

  socket.on("message-send", async data => {
    // console.log(socket.request.session.passport.user.id);

    // await db.collection("chatMessage").insertOne({
    //   parentRoom: new ObjectId(String(data.room)),
    //   content: data.content,
    // });
    console.log(data.content);
    io.to(data.room).emit("message-broadcast", data.content);
  });

  //서버만 룸에 유저 넣는 것 가능
  //유저는 서버에 요청해야만 룸에 조인 가능
  //유저들이 들어갈 수 있는 웹 소켓 방
  //한 유저는 여러 room에 들어갈 수 있다.
  //서버 -> room에 속한 유저에게 메시지 전송 가능
});

//어떤 유저가 서버로 메시지 보내면
//서버는 그 메시지를 같은 룸에 속한 사람들에게 모두 메시지를 전송한다.
