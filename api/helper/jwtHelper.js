const jwt = require("jsonwebtoken")

const generateToken = (data) => {
    const token = jwt.sign(data.toJSON(), process.env.JWT_SECRET);
    return token;
};

const jwtAuthenticationMiddleware = (req,res,next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;
    next()
  } catch(err) {
    console.log(err)
    return res.status(401).json({success: false, msg: "Invalid authorization token!"})
  }
};

const authenticateSocketConnection = (socket, next) =>{
  try {
    const bearerToken = socket.handshake.query?.token;
    const token = bearerToken.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
  } catch (err) {
    return next(new Error("NOT AUTHORIZED"));
  }
  next();
}

module.exports = {generateToken, jwtAuthenticationMiddleware, authenticateSocketConnection}