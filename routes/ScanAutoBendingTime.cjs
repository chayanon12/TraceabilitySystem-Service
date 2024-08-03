const express = require("express");
const router = express.Router();
const ScanAutoBendingTime = require("../WorkService/Model_ScanAutoBendingTime.cjs");

router.post('/BendingTime/GetBangdingMachineData',ScanAutoBendingTime.GetBangdingMachineData);



module.exports = router;
