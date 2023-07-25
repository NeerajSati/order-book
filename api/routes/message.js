const router = require("express").Router();
const {allMessages} = require("../controllers/message")
const {jwtAuthenticationMiddleware} = require("../helper/jwtHelper");

router.get('/all', jwtAuthenticationMiddleware, allMessages)

module.exports = router