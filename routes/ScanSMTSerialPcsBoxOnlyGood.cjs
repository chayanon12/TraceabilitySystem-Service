const express = require("express");
const router = express.Router();
const ScanSMTPcsBoxOnlyGood = require("../WorkService/Modal_ScanSMTSerialPcsBoxOnlyGood.cjs");

router.post("/GetExistsBoxSerial", ScanSMTPcsBoxOnlyGood.GetExistsBoxSerial);

module.exports = router;