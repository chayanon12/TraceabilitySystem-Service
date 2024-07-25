const express = require("express");
const router = express.Router();
const ScanSMTSerialSht = require("../WorkService/Model_ScanSMTSerialShtConfirm.cjs");

router.post("/getSerialForUpdate", ScanSMTSerialSht.GetSerialForUpdate);

module.exports = router;