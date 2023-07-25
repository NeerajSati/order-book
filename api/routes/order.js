const router = require("express").Router();
const {createOrder, listOrders} = require("../controllers/order")

router.post('/list', listOrders)
router.post('/create', createOrder)

module.exports = router