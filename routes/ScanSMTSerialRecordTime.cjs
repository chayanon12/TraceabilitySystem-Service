const express = require("express");
const router = express.Router();
const ScanSMTSerialRecordTime = require("../WorkService/Model_ScanSMTSerialRecordTime.cjs");

router.post("/GetOperatorRecordTimeData", ScanSMTSerialRecordTime.GetOperatorRecordTimeData);

module.exports = router;