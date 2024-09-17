const express = require("express");
const router = express.Router();
const ChangeSerial = require("../WorkService/Model_ChangeSerial.cjs");

router.post("/GetserialnoChangserial",ChangeSerial.GetserialnoChangserial);
router.post("/GetserialnoChangserialoldnew",ChangeSerial.GetserialnoChangserialoldnew);
router.post("/SetserialnoChangserial",ChangeSerial.SetserialnoChangserial);


module.exports = router;