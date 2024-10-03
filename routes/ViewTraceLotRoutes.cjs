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


module.exports = router;