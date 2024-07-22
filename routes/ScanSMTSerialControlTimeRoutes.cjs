const express = require("express");
const router = express.Router();
const ScanSMTSerialControl = require("../WorkService/Model_ScanSMTSerialControlTime.cjs");

router.post("/setSerialProcControlTimeTable", ScanSMTSerialControl.SetSerialProcControlTimeTable);

module.exports = router;