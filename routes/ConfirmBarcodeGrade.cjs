const express = require("express");
const router = express.Router();
const Barcode = require("../WorkService/Model_BarcodeGrade.cjs");

router.post("/fnLotSheetBadmarkData", Barcode.fnLotSheetBadmarkData);
// router.get("/getconnectshtmastercheckresult", Common.getconnectshtmastercheckresult);

module.exports = router;
