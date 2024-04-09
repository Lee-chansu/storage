require("dotenv").config();
const express = require("express");
const app = express();

const methodOverride = require("method-override");

//채팅기능
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server);

//시간 표시
const moment = require("moment");

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
app.use(methodOverride("_method"));

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
io.engine.use(session(sessionOption));

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

  /* let result = await db
  .collection('post').
  updateOne({수정할부분},{$set : {덮어쓸 내용}})*/

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

//-----------------------회원가입---------------

app.get("/join", (req, res) => {
  let message;
  res.render("join.ejs", { message });
});

app.post("/join/IdCheck", async (req, res) => {
  const { userId } = req.body;
  let checkId = await db.collection("user").findOne({ userId: req.body.userId });
  let message = checkId ? "이미 존재하는 아이디입니다." : "사용할 수 있습니다.";

  console.log(message);
  res.render("join.ejs", { message });
});

app.post("/join", async (req, res) => {
  const { userId, password } = req.body;

  try {
    if (!userId) {
      res.send("아이디를 입력해주세요. <a href='/join'>돌아가기</a>");
    } else if (!password) {
      res.send("비밀번호를 입력해주세요. <a href='/join'>돌아가기</a>");
    } else {
      let hash = await bcrypt.hash(password, 10);

      await db.collection("user").insertOne({
        userId,
        password: hash,
      });
    }
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

//----------------로그인----------------------

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/alert-login", (req, res) => {
  res.render("alert-login.ejs");
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

app.get("/alert-logout", (req, res) => {
  res.render("alert-logout.ejs");
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
    let comment = await db
      .collection("comment")
      .find({ parentId: id })
      .toArray();

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
  const writer = req.user.userId;
  await db.collection("comment").insertOne({
    content,
    parentId, // post 컬렉션 _id 게시글 아이디
    writerId, // 로그인한 사람의 _id(현재 로그인 사용자)
    writer,
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

  let writer = await db.collection("post").findOne({
    _id: new ObjectId(req.query.writerId),
  });

  let result = await db.collection("chatroom").findOne({
    //  _id: new ObjectId(id)
    member: { $all: [req.user.userId, writer.userId] },
  });

  if (!result) {
    if (req.user) {
      await db.collection("chatroom").insertOne({
        member: [req.user.userId, writer.userId],
        date: moment(new Date()).format("YY-MM-DD HH:mm:ss"),
      });
      res.redirect("/chat/list");
    } else {
      res.redirect("/alert-login");
    }
  } else {
    if (req.user) {
      res.redirect(`/chat/detail/${result._id}`);
    } else {
      res.redirect("/alert-login");
    }
  }
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
    .find({ member: req.user.userId })
    .toArray();
  res.render("chatList.ejs", { result, loginInfo });
});

//채팅방 내용 확인하기
app.get("/chat/detail/:id", async (req, res) => {
  const { id } = req.params;
  //
  //채팅방 목록 번호
  //chatRoom : _id;
  //chatMessage : parentRoom;
  let loginInfo;

  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요" };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요!" };
  }

  let chatInfo = await db.collection("chatroom").findOne({
    _id: new ObjectId(id),
  });

  let chat = await db
    .collection("chatMessage")
    .find({ parentRoom: new ObjectId(id) })
    .toArray();

  //찾는 것에 대한 조건이 1개일 때 : find({member : 조건})
  //찾는 것에 대한 조건이 2개 이상일 때
  // : find( member : {$all : [조건1, 조건2, ...] })

  res.render("chatDetail.ejs", { chatInfo, chat, loginInfo });
});

io.on("connection", socket => {
  console.log("websocket 연결");

  socket.on("ask-join", data => {
    socket.join(data);
  });

  //스크립트의 key값과 동일한 키값이 주어져야 데이터를 받아올 수 있다.
  socket.on("message-send", async data => {
    // 만약 ejs에서 id검색을 new ObjectId로 했다면
    // 채팅을 저장할 때도 반드시 new ObjectId를 붙여서 저장해줘야한다.
    const date = moment(new Date());

    await db.collection("chatMessage").insertOne({
      parentRoom: new ObjectId(String(data.room)),
      content: data.msg,
      date: date.format("YY-MM-DD HH:mm:ss"),
      who: socket.request.session.passport.user.userId,
    });

    const result = [
      await db.collection("chatMessage").findOne(
        {
          parentRoom: new ObjectId(String(data.room)),
        },
        { sort: { _id: -1 } }
      ),
      socket.request.session.passport.user.userId,
    ];

    io.to(data.room).emit("message-broadcast", result);
  });
});

//서버만 룸에 유저 넣는 것 가능
//유저는 서버에 요청해야만 룸에 조인 가능
//유저들이 들어갈 수 있는 웹 소켓 방
//한 유저는 여러 room에 들어갈 수 있다.
//서버 -> room에 속한 유저에게 메시지 전송 가능

//어떤 유저가 서버로 메시지 보내면
//서버는 그 메시지를 같은 룸에 속한 사람들에게 모두 메시지를 전송한다.
