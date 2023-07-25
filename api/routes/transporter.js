const router = require("express").Router();
const {listTransporters} = require("../controllers/transporter")
const {jwtAuthenticationMiddleware} = require("../helper/jwtHelper");

router.get('/list', jwtAuthenticationMiddleware, listTransporters)

module.exports = router