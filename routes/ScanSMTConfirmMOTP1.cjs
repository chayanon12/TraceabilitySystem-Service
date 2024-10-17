const express = require("express");
const router = express.Router();
const ScanSMTConfirmMOTP1 = require("../WorkService/Model_ScanSMTConfirmMOTP1.cjs");

router.post("/GetCountConfirmMagazineBySerial", ScanSMTConfirmMOTP1.GetCountConfirmMagazineBySerial);

module.exports = router;