const express = require("express");
const router = express.Router();
const ScanAOISheetNo = require("../WorkService/Model_ScanAOISheetNo.cjs");

router.post("/GetAOISheetCountbyLot", ScanAOISheetNo.GetAOISheetCountbyLot);
router.post("/GetAOISheetDataByLot", ScanAOISheetNo.GetAOISheetDataByLot);
router.post("/GetAOISheetCount", ScanAOISheetNo.GetAOISheetCount);
router.post("/SetAOISheetNo", ScanAOISheetNo.SetAOISheetNo);
router.post("/DeleteAOISheetNo", ScanAOISheetNo.DeleteAOISheetNo);
router.post("/fnGetAOISheetRejectData", ScanAOISheetNo.fnGetAOISheetRejectData);

module.exports = router;