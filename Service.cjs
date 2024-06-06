const express = require("express");
const app = express();
const port = 3001;
const oracledb = require("oracledb");
const LoginService = require("./Conncetion/LoginService.cjs");
const MenuService = require("./Conncetion/menuService.cjs");
const sheetmaster = require("./WorkService/sheetmaster.cjs");
const serialmaster = require("./WorkService/serialMaster.cjs");
const productmaster = require("./WorkService/productmaster.cjs");
const ScanSMTRollSht = require("./WorkService/Model_ScanSMTRoollSht.cjs");
const ScanSMTFIN = require("./WorkService/Model_ScanSMTSerialShtFINManySht.cjs");
const ScanSheetMOTTime = require("./WorkService/Model_ScanSheetMOTTime.cjs");
const Common = require("./WorkService/Model_Common.cjs");

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Common
app.get("/api/Common/GetProductData",Common.GetProductData);
app.get("/api/Common/getconnectshtmastercheckresult",Common.getconnectshtmastercheckresult);

app.get("/api/current-date", MenuService.getCurrentDate);
app.get("/api/getIPaddress", LoginService.getIPaddress);
app.post("/api/login", LoginService.login);
app.post("/api/MenuName", MenuService.Menuname);
app.post("/api/MenuHome", MenuService.MenuHome);
app.post("/api/getLot", ScanSMTRollSht.getLot);
app.post("/api/getProduct", ScanSMTRollSht.getProduct);
app.post("/api/GetSerialProductByProduct", ScanSMTRollSht.GetSerialProductByProduct);
app.post("/api/GetRollLeafTotalByLot", ScanSMTRollSht.GetRollLeafTotalByLot);

// app.get("/api/test", ScanSMTFIN.test);

app.post("/api/GetProductData", ScanSMTFIN.GetProductData);
app.post("/api/GetProductDataByLot", ScanSMTFIN.GetProductDataByLot);
app.post("/api/GetLotSerialCountData", ScanSMTFIN.GetLotSerialCountData);
app.post("/api/GetSerialProductByProduct", ScanSMTFIN.GetSerialProductByProduct);
app.post("/api/GetConnectShtMasterCheckResult", ScanSMTFIN.GetConnectShtMasterCheckResult); 
app.post("/api/GetWeekCodebyLot", ScanSMTFIN.GetWeekCodebyLot);

//Sheet Structure Master
app.post("/api/searchCodeName", sheetmaster.postCodeName);
app.post("/api/insSheet_Master", sheetmaster.insertSheet_Master);
app.post("/api/updateSheet_Master", sheetmaster.updateSheet_Master);
app.post("/api/delSheet_Master", sheetmaster.delSheet_Master);
app.post("/api/CheckSHTCode", sheetmaster.postSHTCode);

//Serial Structure Master
app.post("/api/SearchSerial", serialmaster.SerialCodeName);
app.post("/api/insSerial_Master", serialmaster.insertSerial_Master);
app.post("/api/updateSerial_Master", serialmaster.updateSerial_Master);
app.post("/api/delSerial_Master", serialmaster.delSerial_Master);
app.post("/api/CheckrunCode", serialmaster.runningCode);

//Product Master
app.post("/api/searchFactory", productmaster.searchFactory);
app.post("/api/Factory", productmaster.getFactory);
app.post("/api/SerialStructure", productmaster.getSerialStructure);
app.post("/api/SheetStructure", productmaster.getSheetStructure);
app.post("/api/SheetType", productmaster.getSheetType);
app.post("/api/ProceesControl", productmaster.getProceesControl);
app.post("/api/insProduct_Master", productmaster.insertProduct_Master);
app.post("/api/updateProduct_Master", productmaster.updateProduct_Master);
app.post("/api/delProduct_Master", productmaster.deleteProduct_Master);

//ScanSheetMOTTime
app.post("/api/GetProductNameByLot", ScanSheetMOTTime.GetProductNameByLot);
app.post("/api/GetMOTRecordTimeData", ScanSheetMOTTime.GetMOTRecordTimeData);
app.post("/api/CallFPCSheetLeadTimeResult", ScanSheetMOTTime.CallFPCSheetLeadTimeResult);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
