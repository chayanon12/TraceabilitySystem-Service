const express = require("express");
const router = express.Router();
const ScanSMTPlasma = require("../WorkService/Model_ScanSMTPlasmaStopStart.cjs");

router.post("/getStartStopRecordTimeByPackingNo", ScanSMTPlasma.getStartStopRecordTimeByPackingNo);
router.post("/getStartStopRecordTimeByPartialNo", ScanSMTPlasma.getStartStopRecordTimeByPartialNo);
router.post("/setStartStopRecordTimeByPartialNo", ScanSMTPlasma.setStartStopRecordTimeByPartialNo);

module.exports = router;