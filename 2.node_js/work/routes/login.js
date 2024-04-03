const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/login", (req, res) => {
  //카카오나 구글의 경우 local => google || kakao
  passport.authenticate("local", (error, user, info) => {
    //에러 처리 방식 등은 커스텀 가능
    if (error) return res.status(500).json(error);
    if (!user) return res.status(401).send(info.message);

    
    req.login(user, err => {
      if (err) return next(err); //오류가 나면 next 미들웨어로 오류처리를 넘긴다.
      res.redirect("/");
    });
  })(req, res);
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
