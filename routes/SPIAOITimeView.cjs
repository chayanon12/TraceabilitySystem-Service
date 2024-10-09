const express = require("express");
const router = express.Router();
const SPIAOITimeView = require("../WorkService/Model_SPIAOITimeView.cjs");

router.post("/fnSheetSPIAOITimeData",SPIAOITimeView.fnSheetSPIAOITimeData);

module.exports = router;