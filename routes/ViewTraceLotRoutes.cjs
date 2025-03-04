const express = require("express");
const router = express.Router();
const ViewTraceLot = require("../WorkService/Model_ViewTraceLot.cjs");

router.post("/GetDataViewLot",ViewTraceLot.getdataviewlot);
router.post("/GetDataViewLot2",ViewTraceLot.getdataviewlot2);
router.post("/GetDataViewLot3",ViewTraceLot.getdataviewlot3);
router.post("/fnlotresultfinalgatedata",ViewTraceLot.fnlotresultfinalgatedata);
router.post("/fnGetProcessLinkData",ViewTraceLot.fnGetProcessLinkData);
router.post("/fnLotResultFinalGateDeatailData",ViewTraceLot.fnLotResultFinalGateDeatailData);
router.post("/fnSheetSerialByLotData",ViewTraceLot.fnSheetSerialByLotData);
router.post("/fnLotRollLeafByLotData",ViewTraceLot.fnLotRollLeafByLotData);
router.post("/fnLotRollLeafNo",ViewTraceLot.fnLotRollLeafNo);
router.post("/fnLotSheetFrontData",ViewTraceLot.fnLotSheetFrontData);
router.post("/fnLotSheetBackData",ViewTraceLot.fnLotSheetBackData);
router.post("/GetDatatLotTrace",ViewTraceLot.GetDatatLotTrace);
router.post("/ReferPREVIUSLOT",ViewTraceLot.ReferPREVIUSLOT);
router.post("/ReferNEXTLOT",ViewTraceLot.ReferNEXTLOT);
router.post("/GetMaterial1",ViewTraceLot.GetMaterial1);
router.post("/GetMaterial2",ViewTraceLot.GetMaterial2);
router.post("/GetDetail",ViewTraceLot.GetDetail);
router.post("/fnLotSheetData",ViewTraceLot.fnLotSheetData);

module.exports = router;