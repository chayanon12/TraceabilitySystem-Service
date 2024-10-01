const express = require("express");
const router = express.Router();
const ViewTraceSheet = require("../WorkService/Model_ViewTraceSheet.cjs");

router.post("/GetLotSheet",ViewTraceSheet.GetLotSheet);
router.post("/GetProductSheet",ViewTraceSheet.GetProductSheet);
router.post("/GetSPI",ViewTraceSheet.GetSPI);
router.post("/GetPreAOI",ViewTraceSheet.GetPreAOI);
router.post("/GetAOI",ViewTraceSheet.GetAOI);
router.post("/GetAOI_Coating",ViewTraceSheet.GetAOI_Coating);
router.post("/Getinspection",ViewTraceSheet.Getinspection);
router.post("/Get_LOT_SHEET_SERIAL",ViewTraceSheet.Get_LOT_SHEET_SERIAL);
router.post("/GetXray",ViewTraceSheet.GetXray);







module.exports = router;