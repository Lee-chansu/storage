require("dotenv").config();
const router = require("express").Router();

const passport = require("passport");

//로그인 페이지
router.get("/login", (req, res) => {
  res.render("login.ejs");
});

//로그인
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return res.status(500).json(error);
    if (!user) return res.status(401).json(info.message);

    req.logIn(user, err => {
      if (err) return next(err);
      res.redirect("/list");
    });
  })(req, res, next);
});

//로그아웃
router.get("/logout", async (req, res) => {
  let session = req.session;
  req.logout(() => {
    session.destroy();
    res.redirect('/list');
  });
});

module.exports = router;
