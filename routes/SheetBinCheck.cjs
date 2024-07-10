const express = require("express");
const router = express.Router();
const SheetBinCheck = require("../WorkService/Model_SheetBinCheck.cjs");

router.post('/SheetBinChecking/GetSheetBinInspectNo',SheetBinCheck.GetSheetBinInspectNo);


module.exports = router;