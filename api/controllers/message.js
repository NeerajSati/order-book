const Message = require("../models/MessageSchema");

const allMessages = async(req,res)=>{
    try{
        let messages = await Message.find().sort({createdAt: 1}).or([{senderId: req.userId}, {receiverId: req.userId}]);
        return res.status(200).json({success:true, msg: "Messages fetched!", data: messages})
    } catch(err){
        return res.status(400).json({success: false, msg: "Something went wrong!", error: err})
    }
}

module.exports = {
    allMessages
}