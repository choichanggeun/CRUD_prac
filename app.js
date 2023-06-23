const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const port = 4000;



const postsRouter = require('./routes/posts.js');
const commentsRouter = require('./routes/comments.js');
const usersRouter = require('./routes/users.js');
const loginRouter = require('./routes/login.js')

const connect = require("./schemas/");
connect();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", [postsRouter,commentsRouter,usersRouter,loginRouter]);

app.get('/', (req, res) => {
  res.send('2_Week_Project');
});


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});   