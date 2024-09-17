const express = require("express");
const router = express.Router();
const ScanSMTConnectRollConfirm = require("../WorkService/Model_ScanSMTConnectRollConfirm.cjs");

router.post("/SetConfirmConnectRollLeaf",ScanSMTConnectRollConfirm.SetConfirmConnectRollLeaf);
router.post("/CallFPCFlowConfirmConnectRollLeaf",ScanSMTConnectRollConfirm.CallFPCFlowConfirmConnectRollLeaf);


module.exports = router;
