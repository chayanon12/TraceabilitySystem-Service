const express = require("express");
const router = express.Router();
const ViewTraceSheet = require("../WorkService/Model_Result.cjs");


router.post("/GetAoi_Coa_Result2",ViewTraceSheet.GetAoi_Coa_Result2);
router.post("/SPIResult_getCheckData",ViewTraceSheet.SPIResult_getCheckData);
router.post("/SPIResult_Getfinaldata",ViewTraceSheet.SPIResult_Getfinaldata);
router.post("/PreResult_GetCheck",ViewTraceSheet.PreResult_GetCheck);
router.post("/PreResult_GetDataFound",ViewTraceSheet.PreResult_GetDataFound);
router.post("/PreResult_GetDataNotFound",ViewTraceSheet.PreResult_GetDataNotFound);
router.post("/PreResult_GetDataNotFoundFound",ViewTraceSheet.PreResult_GetDataNotFoundFound);














module.exports = router;