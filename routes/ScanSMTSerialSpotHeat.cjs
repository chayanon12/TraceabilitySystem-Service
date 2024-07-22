const express = require("express");
const router = express.Router();
const SpotHeat = require("../WorkService/Model_ScanSMTSerialSpotHeat.cjs");

router.post('/SpotHeat/GetSerialSpotHeatResult',SpotHeat.GetSerialSpotHeatResult);


module.exports = router;