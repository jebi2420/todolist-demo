const User = require('../model/User');
const bcrypt = require("bcrypt");
const saltRound = 10;

const userController = {}

userController.createUser = async (req, res)=>{
    try{
        const {email, name, password} = req.body

        // 비밀번호 암호화
        const salt = bcrypt.genSaltSync(saltRound);
        const hash = bcrypt.hashSync(password, salt); 

        // 이미 가입된 user인지 확인
        const user = await User.findOne({email});
        if(user){
            throw new Error('이미 가입된 유저입니다')
        }

        // 암호화된 비번을 가진 유저 정보 저장
        const newUser = new User({email, name, password:hash});
        await newUser.save();
        res.status(200).json({status:"signup sucess"});

    }catch(error){
        res.status(400).json({status:"signup fail", error: error.message})
    }
}

userController.loginWithEmail = async(req, res)=>{
    try{
        // 유저가 입력한 이메일, 패스워드 정보 읽어오기
        const {email, password} = req.body
        // 이메일을 가지고 유저정보 가져오기
        const user = await User.findOne({email}, "-createdAt -updatedAt -__v");
        // 이 유저에 디비에 있는 패스워드와 프엔에서 보낸 패스워드가 같은지 비교
        if(user){
            const isMatch = bcrypt.compareSync(password, user.password); 
            if(isMatch){
                // 맞으면 토큰 발행
                const token = user.generateToken();
                return res.status(200).json({status: "sign in success", user, token})
            }
        }
        throw new Error ("아이디 또는 비밀번호가 일치하지 않습니다")
    }catch(error){
        res.status(400).json({status:"sign in fail", message: error.message})
    }
}

userController.getUser= async(req, res)=>{
    try{
        const {userId} = req; //req.userId
        const user =  await User.findById(userId);
        if(!user){
            throw new Error("can not find user");
        }
        res.status(200).json({status: "success", user});
    }catch(error){
        res.status(400).json({status:" get user fail", message: error.message})
    }
}

module.exports = userController;