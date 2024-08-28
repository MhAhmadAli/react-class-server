const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
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
  console.log(req.body);
  res.send('Hello World!');
});

app.post('/signup', (req, res) => {
  res.send("Signup Success");
})

app.listen(4000, () => {
  console.log("Server started on http://localhost:4000")
});
