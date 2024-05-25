const express = require("express");
const authController = require('../controller/auth.controller');
const router = express.Router();
const userController = require("../controller/user.controller");

// 1. 회원가입 endpoint (create user)
router.post("/", userController.createUser);
// 2. 로그인 endpoint
router.post("/login", userController.loginWithEmail);
// 토큰을 통해 유저 id 빼내고 => 그 아이디로 유저 객체 찾아서 보내주기
router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;