const express = require("express");
const router = express.Router();
const ScanShtInspect = require("../WorkService/Model_ScanSheetInspect.cjs");

router.post("/getLot", ScanShtInspect.getLotNo);

module.exports = router;