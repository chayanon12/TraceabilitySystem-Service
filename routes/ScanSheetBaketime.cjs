const express = require("express");
const router = express.Router();
// const ScanSMTFIN = require("../WorkService/Model_ScanSMTSerialShtFINManySht.cjs");
const BakeTime = require("../WorkService/Model_ScanSheetBakeTime.cjs");

router.post("/CallSMTBakingRecordTimeResult", BakeTime.CallSMTBakingRecordTimeResult);
router.post("/DeleteBakingRecordTimeData", BakeTime.DeleteBakingRecordTimeData);


module.exports = router;