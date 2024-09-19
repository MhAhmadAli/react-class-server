const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  pass: Joi.string().min(10).alphanum().required()
});

function isAuthorized(req, res, next) {
  if(!req.session.user) {
    return res.status(401).send("Unauthorized!");
  }
  next();
}

function validateInput(req, res, next) {
  const data = req.body;

  const result = schema.validate(data);
  if (result.error) {
    return next(result.error.message);
  }
  next();
}

module.exports = {
  isAuthorized,
  validateInput
};