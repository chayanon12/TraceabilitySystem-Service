const express = require("express");
const router = express.Router();
const ScanSMTSerialXrayConfirm = require("../WorkService/Model_ScanSMTSerialXrayConfirm.cjs");

router.post("/GetSerialXRayResult",ScanSMTSerialXrayConfirm.GetSerialXRayResult);

module.exports = router;