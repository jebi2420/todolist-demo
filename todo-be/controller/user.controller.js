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

module.exports = userController;