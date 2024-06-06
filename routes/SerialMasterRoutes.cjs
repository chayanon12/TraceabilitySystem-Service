const express = require("express");
const router = express.Router();
const serialMaster = require("../WorkService/serialMaster.cjs");

router.post("/SearchSerial", serialMaster.SerialCodeName);
router.post("/insSerial_Master", serialMaster.insertSerial_Master);
router.post("/updateSerial_Master", serialMaster.updateSerial_Master);
router.post("/delSerial_Master", serialMaster.delSerial_Master);
router.post("/CheckrunCode", serialMaster.runningCode);

module.exports = router;