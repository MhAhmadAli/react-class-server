const Users = require("../models/users.model");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  const { email, pass } = req.body;

  const userData = await Users.findOne({ email }).then((data) => {
    return data;
  });

  if (!userData) {
    return res.status(401).send("Wrong Credentials!");
  }

  const isSame = bcrypt.compareSync(pass, userData.password);

  setTimeout(() => {
    if (email !== userData.email || !isSame) {
      return res.status(401).send("Wrong Credentials!");
    }

    userData.password = undefined;
    req.session.user = userData;
    return res.status(200).send(userData);
  }, 1000);
};

async function signup(req, res) {
  const { email, pass } = req.body;

  const temp = await Users.findOne({ email: email }).then((data) => {
    return data;
  });

  if (temp) {
    return res.status(401).send("User already exists!");
  }

  const hashedPass = bcrypt.hashSync(pass, 10);

  const user = new Users({
    email: email,
    password: hashedPass,
  });

  user.save().then((data) => {
    return res.status(200).send(data);
  }).catch((err) => {
    return res.status(422).send(err);
  });
}

async function dynamicEmail(req, res) {
  const user = await Users.findOne({ email: req.params.email }).then((data) => {
    return data;
  });
  res.send(user);
};

async function getUser(req, res) {
  const user = await Users.findOne({ email: req.query.email }).then((data) => {
    return data;
  });

  res.send(user);
}



module.exports = {
  login,
  signup,
  dynamicEmail,
  getUser
};