const express = require("express");
const router = express.Router();
const ScanSMTSerialSht = require("../WorkService/Model_ScanSMTSerialSht.cjs");

router.post("/getSheetAutoPressResult", ScanSMTSerialSht.GetSheetAutoPressResult);

module.exports = router;