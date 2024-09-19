const express = require("express");
const router = express.Router();
const ScanAVIConfirmResult = require("../WorkService/Model_ScanAVIConfirmResult.cjs");

router.post("/GetProductDataAVIResultConfirm",ScanAVIConfirmResult.GetProductDataAVIResultConfirm);



module.exports = router;