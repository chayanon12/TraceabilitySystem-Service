const express = require("express");
const app = express();
const port = 3001;
const oracledb = require("oracledb");
const LoginService = require("./Conncetion/LoginService.cjs");
const serialmaster = require("./WorkService/serialMaster.cjs");
const MenuService = require("./Conncetion/menuService.cjs");
const ScanSMTRollSht = require("./Conncetion/ScanSMTRoollSht.cjs");
const ScanSMTFIN = require("./WorkService/Model_ScanSMTSerialShtFINManySht.cjs");

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/api/current-date", MenuService.getCurrentDate);
app.get("/api/getIPaddress", LoginService.getIPaddress);
app.post("/api/login", LoginService.login);
app.post("/api/MenuName", MenuService.Menuname);
app.post("/api/CheckrunCode", serialmaster.SerialCodeName);
app.post("/api/getLot", ScanSMTRollSht.getLot);

app.get("/api/GetProductData", ScanSMTFIN.GetProductData);
app.post("/api/GetProductDataByLot", ScanSMTFIN.GetProductDataByLot);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
