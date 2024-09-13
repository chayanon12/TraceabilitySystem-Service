const express = require("express");
const router = express.Router();
const AOIConfirmResult = require("../WorkService/Model_aoiconfirmresult.cjs");

router.post("/GetSheetAOIXRayResult", AOIConfirmResult.GetSheetAOIXRayResult);

 
 
module.exports = router;
