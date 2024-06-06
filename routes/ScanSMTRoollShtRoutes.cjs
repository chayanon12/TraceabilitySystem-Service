const express = require("express");
const router = express.Router();
const ScanSMTRollSht = require("../WorkService/Model_ScanSMTRoollSht.cjs");

router.post("/getLot", ScanSMTRollSht.getLot);
router.post("/getProduct", ScanSMTRollSht.getProduct);
router.post("/GetSerialProductByProduct", ScanSMTRollSht.GetSerialProductByProduct);
router.post("/GetRollLeafTotalByLot", ScanSMTRollSht.GetRollLeafTotalByLot);



module.exports = router;