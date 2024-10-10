const express = require("express");
const router = express.Router();
const SheetInspection = require("../WorkService/Model_SheetInspection.cjs");

router.post("/GetSerialAVIResult", SheetInspection.GetSerialAVIResult);

module.exports = router;