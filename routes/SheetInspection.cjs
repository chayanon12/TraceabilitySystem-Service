const express = require("express");
const router = express.Router();
const SheetInspection = require("../WorkService/Model_SheetInspection.cjs");

router.post("/GetSerialAVIResult", SheetInspection.GetSerialAVIResult);
router.post("/GetSheetInspectXOutData", SheetInspection.GetSheetInspectXOutData);
router.post("/GetSheetInspectSheetNoData", SheetInspection.GetSheetInspectSheetNoData);

module.exports = router;