const express = require("express");
const router = express.Router();
const ScanSMTFIN = require("../WorkService/Model_ScanSMTSerialShtFINManySht.cjs");

router.get("/GetProductData", ScanSMTFIN.GetProductData);
router.post("/GetProductDataByLot", ScanSMTFIN.GetProductDataByLot);
router.post("/GetLotSerialCountData", ScanSMTFIN.GetLotSerialCountData);
router.post("/GetSerialProductByProduct", ScanSMTFIN.GetSerialProductByProduct);
router.get("/GetConnectShtMasterCheckResult", ScanSMTFIN.GetConnectShtMasterCheckResult);

module.exports = router;