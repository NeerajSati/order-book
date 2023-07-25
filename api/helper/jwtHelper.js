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

module.exports = {generateToken, jwtAuthenticationMiddleware}