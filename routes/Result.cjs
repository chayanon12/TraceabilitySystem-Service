const express = require("express");
const router = express.Router();
const Result = require("../WorkService/Model_Result.cjs");


router.post("/GetAoi_Coa_Result2",Result.GetAoi_Coa_Result2);
router.post("/GetAoi_Coa_Result2_Export",Result.GetAoi_Coa_Result2_Export);
router.post("/SPIResult_getCheckData",Result.SPIResult_getCheckData);
router.post("/SPIResult_Getfinaldata",Result.SPIResult_Getfinaldata);
router.post("/PreResult_GetCheck",Result.PreResult_GetCheck);
router.post("/PreResult_GetDataFound",Result.PreResult_GetDataFound);
router.post("/PreResult_GetDataNotFound",Result.PreResult_GetDataNotFound);
router.post("/PreResult_GetDataNotFoundFound",Result.PreResult_GetDataNotFoundFound);
router.post("/OSTResult_GetData1",Result.OSTResult_GetData1);
router.post("/OSTResult_GetData2",Result.OSTResult_GetData2);
router.post("/XrayResult",Result.XrayResult);
router.post("/getAOI_RESULT",Result.getAOI_RESULT);
router.post("/Get_AOI_Export",Result.Get_AOI_Export);


  











module.exports = router;