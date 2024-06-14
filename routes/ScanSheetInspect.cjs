const express = require("express");
const router = express.Router();
const ScanShtInspect = require("../WorkService/Model_ScanSheetInspect.cjs");

router.post("/getLotNo", ScanShtInspect.getLotNo);
router.post("/getProductShtGroup", ScanShtInspect.getProductShtGroup);
router.post("/getProductShtInspect", ScanShtInspect.getProductShtInspect);
router.post("/getProductShtBIN", ScanShtInspect.getProductShtBIN);

module.exports = router;