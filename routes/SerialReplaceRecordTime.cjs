const express = require("express");
const router = express.Router();
const SerialReplacrRecordTime = require("../WorkService/Model_SerialReplaceRecordTime.cjs");

router.post("/SearchDataRecord", SerialReplacrRecordTime.SearchDataRecord);
router.post("/SetInsert_SerialConfirm", SerialReplacrRecordTime.SetInsert_SerialConfirm);


module.exports = router;