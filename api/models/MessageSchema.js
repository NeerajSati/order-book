const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    senderId:{
        type:mongoose.ObjectId
    },
    receiverId:{
        type:mongoose.ObjectId,
    },
    data:{
        type:Object,
    },
    isReply:{
        type:Boolean,
    },
},{timestamps:true});

module.exports = mongoose.model("messages", messageSchema);