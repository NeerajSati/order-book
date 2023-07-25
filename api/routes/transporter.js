const router = require("express").Router();
const {listTransporters} = require("../controllers/transporter")

router.post('/list', listTransporters)

module.exports = router