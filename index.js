const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
var cors = require('cors');

const app = express();
const upload = multer();

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

app.post('/login', (req, res) => {
  const {email, pass} = req.body;

  const userData = JSON.parse(fs.readFileSync('user.json'));

  setTimeout(() => {
    if(email !== userData.email && pass !== userData.pass) {
      return res.status(401).send("Wrong Credentials");
    }
    return res.status(200).send("Logged in Successfully");
  }, 5000);
});

app.post('/signup', (req, res) => {
  fs.writeFile('user.json', JSON.stringify(req.body), (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error Saving Data');
    }
    return res.status(200).send("Data Saved Successfully");
  });
})

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000")
});
