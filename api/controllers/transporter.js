const User = require("../models/UserSchema");

const listTransporters = async(req,res)=>{
    try{
        let transporters = await User.find({role: "Transporter"},"email")
        
        return res.status(200).json({success:true, msg: "List is fetched!", data: transporters})
    } catch(err){
        console.log("listTransporters", err)
        return res.status(400).json({success: false, msg: "Something went wrong!", error: err})
    }
}

module.exports = {
    listTransporters
}