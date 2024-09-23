const express = require("express");
const router = express.Router();
const ScanAVIConfirmResult = require("../WorkService/Model_ScanAVIConfirmResult.cjs");

router.post("/GetProductDataAVIResultConfirm",ScanAVIConfirmResult.GetProductDataAVIResultConfirm);
router.post("/GetTestTypeAVIResultConfirm",ScanAVIConfirmResult.GetTestTypeAVIResultConfirm);
router.post("/GetAVIResultConfirmDefault",ScanAVIConfirmResult.GetAVIResultConfirmDefault);





module.exports = router;