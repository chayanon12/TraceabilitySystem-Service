const express = require("express");
const router = express.Router();
const ScanSMTRollSht = require("../WorkService/Model_ScanSMTRoollSht.cjs");

// router.post("/getLot", ScanSMTRollSht.getLot);
router.post("/getproductrollleafdata", ScanSMTRollSht.getproductrollleafdata);
// router.post("/GetSerialProductByProduct", ScanSMTRollSht.GetSerialProductByProduct);
router.post("/GetRollLeafTotalByLot", ScanSMTRollSht.GetRollLeafTotalByLot);
// router.post("/GetRollLeafDuplicate", ScanSMTRollSht.GetRollLeafDuplicate);



module.exports = router;