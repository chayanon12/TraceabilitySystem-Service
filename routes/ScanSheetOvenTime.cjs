const express = require("express");
const router = express.Router();
const ScanSheetOvenTime = require("../WorkService/Model_ScanSheetOvenTime.cjs");

router.post('/setsmtprocflowoven',ScanSheetOvenTime.SET_SMT_PROC_FLOW_OVEN);

module.exports = router;
