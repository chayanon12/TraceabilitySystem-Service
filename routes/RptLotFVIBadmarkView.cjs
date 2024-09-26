const express = require("express");
const router = express.Router();
const FVIBadMark = require("../WorkService/Model_rptLotFVIBadmarkView.cjs");

router.post("/GetSMTConnectShtPcsProduct", FVIBadMark.GetSMTConnectShtPcsProduct);
// router.post("/GetSMTConnectShtPcsShippingNO", FVIBadMark.GetSMTConnectShtPcsShippingNO);
router.post("/GetFVIBadmarkResultBySheet", FVIBadMark.GetFVIBadmarkResultBySheet);
router.post("/GetFVIBadmarkSheetByLot", FVIBadMark.GetFVIBadmarkSheetByLot);
router.post("/GetFVIBadmarkSerialBySheet", FVIBadMark.GetFVIBadmarkSerialBySheet);
router.post("/GetSerialOSTResult", FVIBadMark.GetSerialOSTResult);
router.post("/GetSerialAOIEFPCResult", FVIBadMark.GetSerialAOIEFPCResult);


// router.post("/GetFVIBadmarkSerialBySheet2", FVIBadMark.GetFVIBadmarkSerialBySheet2);



module.exports = router;