function isAuthorized(req, res, next) {
  if(!req.session.user) {
    return res.status(401).send("Unauthorized!");
  }
  next();
}

function checkEmail(req, res, next) {
  if(!req.body.email) {
    return res.status(400).send("Email is required!");
  }
  let temp  = req.body.email;
  if (!temp.includes("@")) {
    return res.status(400).send("Invalid Email!");
  }
  next();
}

function checkPassword(req, res, next) {
  if(!req.body.pass) {
    return res.status(400).send("Password is required!");
  }
  let temp = req.body.pass;
  if (temp.length < 10) {
    return res.status(400).send("Password must be 10 characters long!");
  }

  next();
}

module.exports = {
  isAuthorized,
  checkEmail,
  checkPassword
};