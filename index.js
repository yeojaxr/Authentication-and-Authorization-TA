const express = require("express");
const expressSession = require("express-session");
const cookie = require("cookie-parser");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("view"));
app.use(cookie());

const myusername = "user";
const mypassword = "password";

var session;

app.use(
  expressSession({
    secret: "yeojaxr",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, expires: 60000 },
  })
);

app.get("/", (req, res) => {
  res.render("./view/index.html", {
    username: req.body.username,
    password: req.body.password,
  });
});

app.post("/user", (req, res) => {
  const payload = {
    username: req.body.username,
    password: req.body.password,
  };

  if (payload.username === myusername && payload.password === mypassword) {
    req.session.cookie.id = req.session.id;
    res.cookie("session_id", req.session.id);
    res.json({
      session: req.session.cookie.id,
    });
  } else {
    res.sendStatus(404);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({
    msg: "logged out",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});