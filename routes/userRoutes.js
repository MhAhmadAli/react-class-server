const express = require('express');
const userController = require("../controller/userController");
const userMiddleware = require("../middlewares/userMiddleware");
const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get("/getUser", userMiddleware.isAuthorized, userController.getUser);
router.get("/getUser/:email", userController.dynamicEmail);

module.exports = router;