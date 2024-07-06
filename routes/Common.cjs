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
 router.post("/setSerialRecordTimeTrayTable", Common.SetSerialRecordTimeTrayTable);
 
module.exports = router;
