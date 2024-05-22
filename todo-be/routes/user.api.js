const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

// 1. 회원가입 endpoint (create user)
router.post("/", userController.createUser);

module.exports = router;