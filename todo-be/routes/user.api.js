const express = require("express");
const router = express.Router();

// 1. 회원가입 endpoint (create user)
router.post("/", (req, res)=>{
    res.send("create user contorller will be here");
});

module.exports = router;