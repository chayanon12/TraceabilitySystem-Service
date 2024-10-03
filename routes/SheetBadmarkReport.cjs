const express = require("express");
const router = express.Router();
const SheetBadmarkReport = require("../WorkService/Model_SheetBadmarkReport.cjs");


router.post('/fnLotSheetBadmarkData',SheetBadmarkReport.fnLotSheetBadmarkData);

module.exports = router;