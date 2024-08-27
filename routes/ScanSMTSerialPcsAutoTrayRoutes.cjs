const express = require("express");
const router = express.Router();
const ScanSMTSerialPcs = require("../WorkService/Model_ScanSMTSerialPcsAutoTray.cjs");

router.post("/getserialtestresultmanyonlygood", ScanSMTSerialPcs.GetSerialTestResultManyOnlyGood);


module.exports = router;