const express = require("express");
const router = express.Router();
const ScanSMTFIN = require("../WorkService/Model_ScanSMTSerialShtFINManySht.cjs");

router.get("/GetProductData", ScanSMTFIN.GetProductData);
router.post("/GetProductDataByLot", ScanSMTFIN.GetProductDataByLot);
router.post("/GetLotSerialCountData", ScanSMTFIN.GetLotSerialCountData);
router.post("/GetSerialProductByProduct", ScanSMTFIN.GetSerialProductByProduct);
router.post("/GetConnectShtMasterCheckResult", ScanSMTFIN.GetConnectShtMasterCheckResult);
router.post("/GetRollLeafDuplicate", ScanSMTFIN.GetRollLeafDuplicate);
router.post("/GetConnectShtPlasmaTime", ScanSMTFIN.GetConnectShtPlasmaTime);
router.post("/GetSheetDuplicateConnectShtType", ScanSMTFIN.GetSheetDuplicateConnectShtType);
router.post("/GetRollLeafScrapRBMP", ScanSMTFIN.GetRollLeafScrapRBMP);
router.post("/GetWeekCodebyLot", ScanSMTFIN.GetWeekCodebyLot); //ทำต่อแต่เป็นค่าว่าง wait 
router.post("/GetSerialDuplicateConnectSht", ScanSMTFIN.GetSerialDuplicateConnectSht);
router.post("/SetSerialRecordTimeTrayTable", ScanSMTFIN.SetSerialRecordTimeTrayTable);
router.post("/SetSerialLotShtTable", ScanSMTFIN.SetSerialLotShtTable);





module.exports = router;