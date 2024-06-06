const express = require("express");
const router = express.Router();
const ScanSheetMOTTime = require("../WorkService/Model_ScanSheetMOTTime.cjs");

router.post("/GetProductNameByLot", ScanSheetMOTTime.GetProductNameByLot);
router.post("/GetMOTRecordTimeData", ScanSheetMOTTime.GetMOTRecordTimeData);
router.post("/CallFPCSheetLeadTimeResult", ScanSheetMOTTime.CallFPCSheetLeadTimeResult);

module.exports = router;