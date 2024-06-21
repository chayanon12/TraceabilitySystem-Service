const express = require("express");
const router = express.Router();
const ScanShtInspectXOut = require("../WorkService/Model_ScanSheetInspectXOut.cjs");

router.post("/getProductShtInsXOutByLot", ScanShtInspectXOut.getProductShtInspectByLot);

module.exports = router;