require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const methodOverride = require("method-override");

//채팅 기능
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server);

//시간 표시(관련 라이브러리)
const moment = require("moment");

// db 설정(몽고디비)
const MongoStore = require("connect-mongo");
const { ObjectId } = require("mongodb");
let connectDB = require("./db");
let db;

connectDB
  .then(client => {
    console.log("DB연결성공 - main");
    db = client.db("forum");
    server.listen(process.env.PORT, () => {
      console.log("http://localhost:4000");
    });
  })
  .catch(err => {
    console.log(err);
  });

// 세션 설정
const session = require("express-session");
const sessionOption = {
  secret: "secret-express-session",
  resave: false,
  saveUninitialized: false,
  cooke: { maxAge: 60 * 60 * 1000 },
  store: MongoStore.create({
    mongoUrl: process.env.URL,
    dbName: "forum",
  }),
};

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

// passport 설정
const passport = require("passport");
const LocalStrategy = require("passport-local");

app.use(passport.initialize());
app.use(session(sessionOption));
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "userId", passwordField: "password" },
    async (userId, password, cb) => {
      let result = await db.collection("user").findOne({ userId });
      if (!result)
        return cb(null, fasle, { message: "아이디가 존재하지 않습니다." });

      if (await bcrypt.compare(password, result.password))
        return cb(null, result);
      else return cb(null, false, { message: "비번불일치" });
    }
  )
);

//passport에서 찾아온 정보를 저장해주는 역할
passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user._id, userId: user.userId });
  });
});

//session에 저장된 정보를 토대로 db에서 찾아 일치하면
//해당 요청을 수렴하는 역할
passport.deserializeUser(async (user, done) => {
  let result = await db
    .collection("user")
    .findOne({ _id: new ObjectId(String(user.id)) });

  delete result.password;

  process.nextTick(() => {
    return done(null, user);
  });
});

io.engine.use(session(sessionOption));

//----------------- 메인페이지---------------------
app.get("/", (req, res) => {
  res.redirect("/list"); //list로 바로 넘김
});

//----------------- 'post' 관련 api ---------------------

//글 전체 조회
app.get("/list", async (req, res) => {
  const { title, userId } = req.query;

  let loginInfo;
  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요." };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요." };
  }

  let findPosts;
  if (title) {
    findPosts = await db.collection("post").find({ title });
  } else if (userId) {
    findPosts = await db.collection("post").find({ userId });
  } else {
    findPosts = await db.collection("post").find({}).toArray();
  }

  res.render("list", { findPosts, loginInfo });
});

// 1개만 조회
app.get("/detail/:id", async (req, res) => {
  const { id } = req.params;

  let loginInfo;
  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요." };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요." };
  }

  let postOne, comments;

  try {
    postOne = await db
      .collection("post")
      .findOne({ _id: new ObjectId(String(id)) });

    comments = await db.collection("comment").find({ parentId: id }).toArray();
  } catch (error) {
    console.log(error);
  }

  res.render("detail", { postOne, comments, loginInfo });
});

app.get("/add", (req, res) => {
  let loginInfo;
  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요." };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요." };
  }
  res.render("write", { loginInfo });
});

//글 쓰기
app.post("/add", async (req, res) => {
  const { title, content } = req.body;

  await db.collection("post").insertOne({
    title: title,
    content: content,
    userNum: req.user.id,
    userId: req.user.userId,
  });
  res.redirect("/list");
});

app.post("/comment", async (req, res) => {
  const { content, parentId } = req.body;
  const writerId = req.user.id;
  const writer = req.user.userId;
  await db.collection("comment").insertOne({
    content,
    parentId,
    writerId,
    writer,
  });

  res.redirect("back");
});

// 수정 페이지
app.get("/edit/:id", async (req, res) => {
  const { id } = req.body;

  let loginInfo;
  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요." };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요." };
  }

  let findPost = await db
    .collection("post")
    .findOne({ _id: new ObjectId(String(id)) });

  res.render("edit", { post: findPost, loginInfo });
});

//글 수정
app.put("/edit", async (req, res) => {
  const { id, title, content } = req.body;

  try {
    await db.collection("post").updateOne({
      title: title,
      content,
    });
    res.redirect(`/detail/${id}`);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection("post").deleteOne({ _id: new ObjectId(String(id)) });
    res.redirect("/list");
  } catch (error) {
    console.log(error);
  }
});

//----------------- 'login' 관련 api ---------------------
//로그인 페이지
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return res.status(500).json(error);
    if (!user) return res.status(401).json(info.message);

    if (error) return next(error);

    req.login(user, error => {
      if (error) return next(error);
      res.redirect("/list");
    });
  })(req, res, next);
});

app.get("/alert-login", (req, res) => {
  res.render("alert-login");
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

//----------------- 'join' 관련 api ---------------------

app.get("/join", (req, res) => {
  res.render("join");
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

//----------------- 'chat' 관련 api ---------------------

//로그인한 유저의 정보와 글쓴이의 정보를 토대로 채팅방이 있는지
//검색한 후 없으면 생성, 있으면 chatdetail로 안내
app.get("/chat/request", async (req, res) => {
  let loginInfo;
  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요" };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요!" };
  }

  let writer = await db
    .collection("post")
    .findOne({ _id: new ObjectId(String(req.query.writerId)) });

  let findChatRoom = await db.collection("chatroom").findOne({
    member: { $all: [req.user.userId, writer.userId] },
  });

  if (!findChatRoom) {
    await db.collection("chatroom").inserOne({
      member: [req.user.userId, writer.userId],
      date: moment(new Date()).format("YY-MM-DD HH:mm:ss"),
    });
    res.redirect("/chat/list");
  } else {
    if (req.user) {
      res.redirect(`/chat/detail/${findChatRoom._id}`);
    } else {
      res.redirect("/alert-login");
    }
  }
});

app.get("/chat/list", async (req, res) => {
  let loginInfo;
  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요" };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요!" };
  }

  try {
    let findChatRoom = await db
      .collection("chatroom")
      .find({ member: req.user.userId })
      .toArray();
    res.render("chatList", { findChatRoom, loginInfo });
  } catch (error) {
    console.log(error);
  }
});

app.get("/chat/detail/:id", async (req, res) => {
  let loginInfo;
  if (!req.user) {
    loginInfo = { userId: null, message: "로그인 해주세요" };
  } else {
    loginInfo = { userId: req.user.userId, message: "님 안녕하세요!" };
  }

  const { id } = req.params;
  let chatInfo = await db.collection("chatroom").findOne({
    _id: new ObjectId(id),
  });

  let chat = await db
    .collection("chatMessage")
    .find({ parentRoom: new ObjectId(String(id)) })
    .toArray();

  res.render("chatDetail", { chatInfo, chat, loginInfo });
});

io.on("connection", socket => {
  console.log("websocket 연결");

  socket.on("ask-join", data => {
    socket.join(data);
  });

  socket.on("message-send", async data => {
    const date = moment(new Date());
    const user = socket.request.session.passport.user.userId;

    await db.collection("chatMessage").insertOne({
      parentRoom: new ObjectId(String(data.room)),
      content: data.message,
      date: date.format("YY-MM-DD HH:mm:ss"),
      who: user,
    });

    const newChat = [
      await db
        .collection("chatMessage")
        .findOne(
          { parentRoom: new ObjectId(String(data.room)) },
          { sort: { _id: -1 } }
        ),
      user,
    ];
    io.to(data.room).emit("message-broadcast", newChat);
  });
});
