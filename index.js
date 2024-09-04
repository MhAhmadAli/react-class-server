const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('./models/users.model');
const multer = require('multer');
const fs = require('fs');
var cors = require('cors');

// global objects
const app = express();
const upload = multer();
dotenv.config();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.get('/', (req, res) => {
  console.log("Data Request")
  return res.send('hello, World!');
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

app.post('/login', async (req, res) => {
  const {email, pass} = req.body;

  const userData = await Users.findOne({email}).then((data) => {
    return data;
  });

  if(!userData) {
    return res.status(401).send("Wrong Credentials!");
  }

  setTimeout(() => {
    if(email !== userData.email || pass !== userData.password) {
      return res.status(401).send("Wrong Credentials!");
    }
    return res.status(200).send("Logged in Successfully!");
  }, 1000);
});

app.post('/signup', async (req, res) => {
  // fs.writeFile('user.json', JSON.stringify(req.body), (err) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(500).send('Error Saving Data');
  //   }
  //   return res.status(200).send("Data Saved Successfully");
  // });

  const {email, pass} = req.body;

  const temp = await Users.findOne({ email: email }).then((data) => {
    return data;
  });

  if(temp) {
    return res.status(401).send("User already exists!");
  }

  const user = new Users({
    email: email,
    password: pass,
  });

  user.save().then((data) => {
    return res.status(200).send(data);
  }).catch((err) => {
    return res.status(422).send(err);
  });
})

app.listen(5000, () => {
  mongoose.connect(process.env.DATABASE_URI).then(() => {
    console.log("Database Connected Successfully!")
  });
  console.log("Server started on http://localhost:5000")
});
