const express = require('express');
const userController = require("../controller/userController");
const userMiddleware = require("../middlewares/userMiddleware");
const router = express.Router();

router.post('/login', userMiddleware.checkEmail, userMiddleware.checkPassword, userController.login);
router.post('/signup', userMiddleware.checkEmail, userMiddleware.checkPassword, userController.signup);
router.get("/getUser", userMiddleware.isAuthorized, userController.getUser);
router.get("/getUser/:email", userController.dynamicEmail);

module.exports = router;