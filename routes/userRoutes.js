const express = require('express');
const userController = require("../controller/userController");
const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get("/getUser", userController.getUser);
router.get("/getUser/:email", userController.dynamicEmail);

module.exports = router;