const express = require("express");
const router = express.Router();
const Common = require("../WorkService/Model_Common.cjs");

 router.get("/GetProductData", Common.GetProductData);
 router.post("/getProductDataByLot", Common.GetProductDataByLot);
 router.post("/getlotserialcountdata", Common.getlotserialcountdata);
 router.post("/getWeekCodebyLot", Common.getWeekCodebyLot);
 router.post("/getserialduplicateconnectsht", Common.getserialduplicateconnectsht);
 router.post("/getworkingdate", Common.getworkingdate);
 router.post("/getproductshtinspectdup", Common.getproductshtinspectdup);
 router.post("/getreflowrecordtimedata", Common.GetReflowRecordTimeData);
 router.post("/callSMTReflowRecordTimeResult", Common.CallSMTReflowRecordTimeResult);
 router.post("/deleteReflowRecordTimeData", Common.DeleteReflowRecordTimeData);
 router.post("/getProductNameByLot", Common.GetProductNameByLot);
 router.post("/getMOTRecordTimeData", Common.GetMOTRecordTimeData);
 router.post("/getproductshtinspectbylot", Common.getproductshtinspectbylot);
 router.post("/getproductshtinsXOutbylot", Common.getproductshtinspectXOutbylot);
 router.post("/getproductshtinspectXOut", Common.getproductshtinspectXOut);
 router.post("/getProductShtGroup", Common.getProductShtGroup);
 router.post("/getProductShtBIN", Common.getProductShtBIN);
 router.post("/getProductShtBIN", Common.getProductShtBIN);
 router.post("/setLotSheetInsXOut", Common.setLotSheetInsXOut);
 router.post("/setseriallotshtelttable", Common.SetSerialLotShtELTTable);
 router.post("/getLotSerialRecordTimeData", Common.getLotSerialRecordTimeData);
 router.post("/getSerialRecordTimeTrayTable", Common.getSerialRecordTimeTrayTable);
 router.post("/setSerialRecordTimeTrayTable", Common.SetSerialRecordTimeTrayTable);
 router.post("/SetRollSheetTrayTable", Common.SetRollSheetTrayTable);
 router.post("/SetSerialLotShtGradeTable", Common.SetSerialLotShtGradeTable);
 router.post("/GetSerialProductByProduct", Common.GetSerialProductByProduct);
 router.post("/Get_Spi_aoi_result", Common.get_spi_aoi_result);
 router.post("/getleafduplicateconnectroll", Common.getleafduplicateconnectroll);
 router.post("/getSerialPassByLot", Common.getSerialPassByLot);
 router.post("/setseriallottraytable", Common.SetSerialLotTrayTable);
 router.post("/GetFinalGateMasterCheckResult", Common.GetFinalGateMasterCheckResult);
 router.post("/GetSerialPassByLotPacking", Common.GetSerialPassByLotPacking);
 router.post("/GetBoxCount", Common.GetBoxCount);
 router.post("/GetCountTrayByBoxPacking", Common.GetCountTrayByBoxPacking);
//  router.post("/GetSerialOSTResult", Common.GetSerialOSTResult);
 router.post("/GetCheckChipDuplicate", Common.GetCheckChipDuplicate);
 router.post("/GetSerialFinInspectResult", Common.GetSerialFinInspectResult);
 router.post("/GetEFPCSheetInspectionResult", Common.GetEFPCSheetInspectionResult);
 router.post("/GetSerialBoxProductByProduct", Common.GetSerialBoxProductByProduct);
 router.post("/SetSerialLotTrayTableGood", Common.SetSerialLotTrayTableGood);
 router.post("/GetSerialDuplicate", Common.GetSerialDuplicate);
 router.post("/GetCheckSumSerial", Common.GetCheckSumSerial);
 router.post("/GetSheetNoBySerialNo", Common.Getsheetnobyserialno);
 router.post("/GetSheetDataBySerialNo", Common.Getsheetdatabyserialno);
 router.post("/GetSerialTestResultManyTable", Common.GetSerialTestResultManyTable);
 router.post("/getProductDataFix", Common.getProductDataFix);
 router.post("/GetPlasmaTimeBySerialNo", Common.GetPlasmaTimeBySerialNo);
 router.post("/getcheckspecialbyserial", Common.getcheckspecialbyserial);
 router.post("/GetSerialBoxTestResultManyTableOnlyGood", Common.GetSerialBoxTestResultManyTableOnlyGood);
 router.post("/SetBoxPackingSerialTray", Common.SetBoxPackingSerialTray);
 router.post("/getconnectshtplasmatime", Common.getconnectshtplasmatime);
 router.post("/SetRollLeafTrayTable", Common.SetRollLeafTrayTable);
 router.post("/SetSerialLotShtTable", Common.SetSerialLotShtTable);
 router.post("/getconnectshtmastercheckresult", Common.getconnectshtmastercheckresult);
 router.post("/getSheetDuplicateConnectSht", Common.GetSheetDuplicateConnectSht);
 router.post("/GetShippingSerialNo", Common.GetShippingSerialNo);
 router.post("/GetLotRollLeafDataAllByLot", Common.GetLotRollLeafDataAllByLot);
 router.post("/SetConfirmConnectShtPcs", Common.SetConfirmConnectShtPcs);
//  router.post("/getfinalgatemastercheckresult", Common.GetFinalGateMasterCheckResult);
router.post("/fnGetLotData", Common.fnGetLotData);
router.post("/GetFVIBadmarkResultByLot", Common.GetFVIBadmarkResultByLot);
 
module.exports = router;
