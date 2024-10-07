const express = require("express");
const router = express.Router();
const ViewTraceSheet = require("../WorkService/Model_Result.cjs");


router.post("/GetAoi_Coa_Result2",ViewTraceSheet.GetAoi_Coa_Result2);














module.exports = router;