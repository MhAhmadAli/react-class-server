const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const multer = require('multer');
const userRouter = require('./routes/userRoutes');

// global objects
const app = express();
const upload = multer();
dotenv.config();

// middlewares
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.use('/user', userRouter);


app.get('/', (req, res) => {
  console.log("Data Request")
  return res.send('hello, World13424!');
});

app.post('/', (req, res) => {
  return res.send('Post Called!');
});

app.put('/', (req, res) => {
  return res.send('Put Called!');
});

app.delete('/', (req, res) => {
  return res.send('Delete Called!');
});


app.listen(5000, () => {
  mongoose.connect(process.env.DATABASE_URI).then(() => {
    console.log("Database Connected Successfully!")
  });
  console.log("Server started on http://localhost:5000")
});
