const express = require("express");
const router = express.Router();
const ScanAOISheetNo = require("../WorkService/Model_ScanAOISheetNo.cjs");

router.post("/GetAOISheetCountbyLot", ScanAOISheetNo.GetAOISheetCountbyLot);

module.exports = router;