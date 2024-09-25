const express = require("express");
const router = express.Router();
const PieceTraceView = require("../WorkService/Model_PieceTraceView.cjs");

router.post("/GetSerialNo", PieceTraceView.GetSerialNo);

module.exports = router;