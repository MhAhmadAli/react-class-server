const express = require('express');
var cors = require('cors')
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors())

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

app.listen(4000, () => {
  console.log("Server started!")
});