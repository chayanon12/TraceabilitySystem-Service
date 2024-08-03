const express = require("express");
const router = express.Router();
const ScanSMTSerialBackend = require("../WorkService/Model_ScanSMTSerialBackendConfirm.cjs");

router.post("/getSerialSheetManyTable",ScanSMTSerialBackend.getSerialSheetManyTable);
router.post("/get_backendresult",ScanSMTSerialBackend.get_backendresult);

module.exports = router;