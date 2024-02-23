// 1. 모듈 - require
const express = require("express");
const app = express();

//session 모듈
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// db
const db = require("./models");

// 2. use, set - 등록
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(express.json()); // json형태로 데이터 처리
app.use(express.urlencoded({ extended: true })); // queryString 방식의 데이터 처리

app.use(passport.initialize());

// 세션을 사용하기 위한 옵션 설정
app.use(
  session({
    secret: "1234567890!@#$%^&*()",
    resave: false, //
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1s = 1000ms (쿠키 저장시간 설정) = 1시간
  })
);

// 세션 사용하도록 설정
app.use(passport.session());

// 로그인 검증 - 언제 실행?
passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      let result = await db.user.findOne({ where: { username: username } });
      // 찾는게 없으면  rejected = fasle처리 - ! -? true로 바꿔서
      if (!result) {
        return done(null, false, { message: "아이디 DB에 없음" });
      }

      if (result.password != password) {
        return done(null, false, { message: "비번불일치" });
      }

      return done(null, result);
    }
  )
);

// 세션 생성
passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user.id, username: user.username });
  });
});

//세션 검사
passport.deserializeUser(async (user, done) => {
  let result = await db.user.findOne({ where: { id: user.id } });

  if (result) {
    const newUserInfo = {
      id: result.id,
      username: result.username,
    };
    process.nextTick(() => {
      return done(null, newUserInfo);
    });
  }
});

// 3. listen - 포트번호 지정
app.listen(3000, async () => {
  console.log("접속 성공! - http://localhost:3000 ");
});

// 4. 하위페이지들 - 라우팅

//api
app.get("/", toIndexPage); // index.ejs 보여주기

app.get("/login", toLoginPage); //login.ejs 보여주기
app.post("/login", login); //login 하기
app.get("/login/:state", toLoginFail); //login.ejs 보여주기

app.get("/join", toJoinPage); //regist.ejs 보여주기
app.get("/join/fail", toJoinFailPage); //회원가입 실패 페이지 보여주기
app.post("/join", join); //-회원가입 처리

app.get("/page/:id", toIndexLoginPage); // 로그인한 후의 index.ejs 보여주기
app.get("/logout", toLogout); //로그아웃

app.get("/add/:id", addSchedulePage); // 스케줄 등록 페이지 이동
app.post("/add/:id", addSchedule); // 스케줄 등록하기

app.get("/update/:id", updatePage); //회원정보 수정페이지
app.put("/update/:id", updateUser); //회원정보 수정
app.delete("/remove/:id", removeUser); // 회원 탈퇴

app.get("/set/:id", updateSchedulePage); // schedule 수정페이지로 이동
app.put("/set/:id", updateSchedule); // schedule수정하기

app.delete("/del/:id", delSchedule); // 스케줄 삭제

async function toIndexPage(req, res) {
  res.render("index.ejs");
}

async function toLoginPage(req, res) {
  res.render("login.ejs");
}
async function toLoginFail(req, res) {
  let { state } = req.params;
  if (state == "fail") res.render("login-fail.ejs");
}

//회원 가입 페이지(get)
async function toJoinPage(req, res) {
  res.render("join.ejs");
}
async function toJoinFailPage(req, res) {
  res.render("join-fail.ejs");
}

//회원가입(post)
async function join(req, res) {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    phoneNum: req.body.phoneNum,
  };
  const result = await db.user.findOne({
    where: { username: newUser.username },
  });
  let isJoined = "";
  try {
    if (result) {
      isJoined = "fail";
      res.send(isJoined);
    } else {
      await db.user.create(newUser);
      isJoined = "success";
      res.send(isJoined);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// 로그인 후 스케줄러 페이지(get)
async function toIndexLoginPage(req, res) {
  let { id } = req.params;
  let user = await db.user.findOne({ where: { id } });
  if (!req.user) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('로그인이 필요한 서비스입니다.')</script>");
    res.write("<script>location.href='/login'</script>");
    return;
  } else if (req.user.id != id) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('잘못된 url입니다.')</script>");
    res.write(`<script>location.href='/${req.user.id}'</script>`);
    return;
  }
  try {
    let schedule = await db.schedule.findAll({ where: { user_id: user.id } });

    if (user.id == id) res.render("index-login.ejs", { user, schedule });
    else {
      res.redirect("logout");
    }
  } catch (error) {
    res.status(500).send("에러가 발생했습니다.", error);
  }
}

// 로그아웃(get)
async function toLogout(req, res) {
  if (!req.user) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('로그인이 필요한 서비스입니다.')</script>");
    res.write("<script>location.href='/login'</script>");
    return;
  }
  req.logout(() => {
    res.redirect("/login");
  });
}

// 로그인 기능(post)
async function login(req, res) {
  // 제출한 아이디, 비번이 db에 있는거랑 일치 여부 확인 -> 세션생성
  passport.authenticate("local", (error, user, info) => {
    if (error) return res.status(500).json(error);

    if (!user) return res.redirect("/login/fail");

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/page/" + user.id);
    });
  })(req, res);
}

// 회원정보 수정페이지(get)
async function updatePage(req, res) {
  const { id } = req.params;
  const user = await db.user.findOne({ where: { id } });

  res.render("userEdit.ejs", { user });
}

//회원정보 수정(put)
async function updateUser(req, res) {
  let { id } = req.params;
  const newInfo = {
    username: req.body.username,
    password: req.body.password,
    phoneNum: req.body.phoneNum,
  };
  if (!req.user) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('로그인이 필요한 서비스입니다.')</script>");
    res.write("<script>location.href='/login'</script>");
    return;
  } else if (req.user.id != id) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('잘못된 url입니다.')</script>");
    res.write(`<script>location.href='/${req.user.id}'</script>`);
    return;
  }
  const info = await db.user.findOne({ where: { id } });

  newInfo.array.forEach((element) => {
    info[element] = newInfo[element];
  });

  res.redirect("/" + info.id);
}

//스케줄 등록 페이지(get)
async function addSchedulePage(req, res) {
  let { id } = req.params;
  if (!req.user) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('로그인이 필요한 서비스입니다.')</script>");
    res.write("<script>location.href='/login'</script>");
    return;
  } else if (req.user.id != id) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('잘못된 url입니다.')</script>");
    res.write(`<script>location.href='/${req.user.id}'</script>`);
    return;
  }
  try {
    const user = await db.user.findOne({ where: { id: id } });
    res.render("index-add.ejs", { user });
  } catch (error) {
    res.status(500).send("서버 에러", toString(error));
  }
}

// 스케줄 등록(post)
async function addSchedule(req, res) {
  let { id } = req.params;
  const newPost = {
    user_id: id,
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
  };

  try {
    await db.schedule.create(newPost);
    res.send("스케줄 등록 성공");
  } catch (error) {
    res.status(500).send("서버 에러!", toString(error));
  }
}

// 스케줄 수정페이지 이동(get)
async function updateSchedulePage(req, res) {
  const { id } = req.params;
  const user = await db.user.findOne({ where: { id } });
  const schedule = await db.schedule.findAll({ where: { user_id: id } });

  if (!req.user) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('로그인이 필요한 서비스입니다.')</script>");
    res.write("<script>location.href='/login'</script>");
    return;
  } else if (req.user.id != id) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('잘못된 url입니다.')</script>");
    res.write(`<script>location.href='/${req.user.id}'</script>`);
    return;
  }

  res.render("index-edit.ejs", { schedule, user });
}

//스케줄 수정(put)
async function updateSchedule(req, res) {
  const { id } = req.params;
  const newSchedule = {
    id: req.body.s_id,
    user_id: id,
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
  };
  try {
    // const schedule = await db.schedule.findOne({where : {id : s_id}})

    // newSchedule.forEach((prop)=>{
    //   schedule[prop] = newSchedule[prop]
    // })
    await db.schedule.update(newSchedule, { where: { id: req.body.s_id } });
    return res.send("success!");
  } catch (error) {
    res.status(500).send(error);
  }
}

//회원 탈퇴(delete)
async function removeUser(req, res) {
  let { id } = req.params;
  if (!req.user) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('로그인이 필요한 서비스입니다.')</script>");
    res.write("<script>location.href='/login'</script>");
    return;
  } else if (req.user.id != id) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('잘못된 url입니다.')</script>");
    res.write(`<script>location.href='/${req.user.id}'</script>`);
    return;
  }
  try {
    await db.user.destroy({ where: { id: id } });
    const delCheck = await db.user.findOne({ where: { id: id } });
    if(delCheck) {
      res.send("fail")
    }else{
      res.send("success");
    }
  } catch (error) {
    res.status(500).send("서버 에러", toString(error));
  }
}

//스케줄 삭제(delete)
async function delSchedule(req, res) {
  let { id } = req.params;
  let userId = await db.schedule.findOne({ where: { id: id } });
  if (!req.user) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('로그인이 필요한 서비스입니다.')</script>");
    res.write("<script>location.href='/login'</script>");
    return;
  } else if (req.user.id != userId.user_id) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('잘못된 url입니다.')</script>");
    res.write(`<script>location.href='/${req.user.id}'</script>`);
    return;
  }
  try {
    await db.schedule.destroy({ where: { id: id } });
    res.send("스케줄 삭제 완료");
  } catch (error) {
    res.status(500).send("서버 에러", toString(error));
  }
}
