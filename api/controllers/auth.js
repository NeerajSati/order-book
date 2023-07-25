const User = require("../models/UserSchema");
const jwtHelper = require("../helper/jwtHelper");
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const registerUser = async(req,res)=>{
    try{
        let {email, password, role, address} = req.body;
        if(!email){
            return res.status(400).json({success: false, msg: "Email is Required!"})
        }
        if(!password){
            return res.status(400).json({success: false, msg: "Password is required!"})
        }
        if(!role || (role !== "Manufacturer" && role !== "Transporter")){
            return res.status(400).json({success: false, msg: "Role is required!"})
        }
        if(role === "Manufacturer" && !address){
            return res.status(400).json({success: false, msg: "Address is required for manufacturer!"})
        }

        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({
            email,
            role,
            address,
            password: hashedPassword
        })
        let savedUser = await newUser.save();
        
        return res.status(200).json({success:true, token:jwtHelper.generateToken(savedUser)})
    } catch(err){
        console.log("registerUser", err)
        if(err && err.code === 11000){// duplicate key encountered
            if(err.keyPattern.email){
                return res.status(400).json({success: false, msg: "Email already exists!", error: err})
            }
        }
        return res.status(400).json({success: false, msg: "Something went wrong!", error: err})
    }
}


const loginUser = async(req,res)=>{
    try{
        let {email, password} = req.body;
        if(!email){
            return res.status(400).json({success: false, msg: "Email is Required!"})
        }
        if(!password){
            return res.status(400).json({success: false, msg: "Password is required!"})
        }

        const userData= await User.findOne({email});
        if(!userData){
            return res.status(400).json({success: false, msg: "Email Id does not exist!"})
        }

        const hashedPassword = userData.password;
        const validatePassword = bcrypt.compareSync(password, hashedPassword);
        if(validatePassword){
            userData.password = undefined
            return res.status(200).json({success:true, token:jwtHelper.generateToken(userData)})
        }

        return res.status(400).json({success: false, msg: "Password is incorrect!"})
    } catch(err){
        console.log("loginUser", err)
        return res.status(400).json({success: false, msg: "Something went wrong!", error: err})
    }
}

module.exports = {
    registerUser,
    loginUser
}