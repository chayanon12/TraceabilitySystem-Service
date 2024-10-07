const express = require("express");
const router = express.Router();
const ScanSMTSerialXrayConfirm = require("../WorkService/Model_ScanSMTSerialXrayConfirm.cjs");

router.post("/GetSerialXRayResult",ScanSMTSerialXrayConfirm.GetSerialXRayResult);
router.post("/GetSerialXRaySheetResult",ScanSMTSerialXrayConfirm.GetSerialXRaySheetResult);

module.exports = router;