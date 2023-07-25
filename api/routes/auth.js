const router = require("express").Router();
const {registerUser, loginUser} = require("../controllers/auth")

router.post('/login', loginUser)
router.post('/register', registerUser)

module.exports = router