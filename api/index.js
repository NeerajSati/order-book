const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require("dotenv");
const mongoose = require('mongoose');
dotenv.config();
app.use(cors())
app.use(express.json());
const port = 8000

mongoose.connect(process.env.MONGODB_URL)
.then(console.log("Connected to Database"))
.catch(err=>console.log(err));

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

const authRoutes = require("./routes/auth");
const transporterRoutes = require("./routes/transporter");
const messageRoutes = require("./routes/message");

app.use('/api/auth', authRoutes)
app.use('/api/transporter', transporterRoutes)
app.use('/api/message', messageRoutes)



const socketIo = require("socket.io")
const jwtHelper = require("./helper/jwtHelper")
const Message = require("./models/MessageSchema")
let socketIdMap = {}

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});
io.use(jwtHelper.authenticateSocketConnection);
io.on('connection', (socket) => {
  socket.emit("hello", "world");
  socketIdMap[socket.user._id] = socket.id;

  socket.on('create_order', async (data) => {
    let {from, to, pickup, transporterEmail, transporterId, quantity, orderId} = data;
    if(!from || !to || !pickup || !transporterEmail || !quantity || !orderId){
        return;
    }
    const newMessage = new Message({
      senderId: socket.user._id, receiverId: transporterId, isReply: false, data: {orderId, from, to, pickup, transporterEmail, quantity}
    })

    const savedMessage = await newMessage.save();

    socket.to(socketIdMap[transporterId]).emit("order_received", savedMessage);
    socket.emit("order_sent", savedMessage);
  });

  socket.on('reply_to_order', async (data) => {
      const {messageId, orderId, price} = data;
      if(!messageId || !orderId || !price){
          return;
      }

      const messageDetails = await Message.findById(messageId,"senderId")
      if(!messageDetails || !messageDetails.senderId){
        return;
    }

      const newMessage = new Message({
        senderId: socket.user._id, receiverId: messageDetails.senderId, isReply: true, data: {orderId, price}
      })

      const savedReply = await newMessage.save();
      socket.to(socketIdMap[messageDetails.senderId]).emit("order_reply_received", savedReply);
      socket.emit("order_reply_sent", savedReply);
  });
});