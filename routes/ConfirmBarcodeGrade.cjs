const express = require("express");
const router = express.Router();
const Barcode = require("../WorkService/Model_ConfirmBarcodeGrade.cjs");

router.get("/GetProductData", Barcode.GetProductData);
// router.get("/getconnectshtmastercheckresult", Common.getconnectshtmastercheckresult);

module.exports = router;
