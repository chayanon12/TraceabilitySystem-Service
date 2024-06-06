const express = require("express");
const app = express();
const port = 3001;
const oracledb = require("oracledb");
// Import routes
const commonRoutes = require("./routes/Common.cjs");
const LoginService = require("./routes/loginRoutes.cjs");
const MenuService = require("./routes/MenuRoutes.cjs");
const sheetmaster = require("./routes/sheetmasterRoutes.cjs");
const serialmaster = require("./routes/SerialMasterRoutes.cjs");
const productmaster = require("./routes/productMasterRoutes.cjs");
const ScanSMTRollSht = require("./routes/ScanSMTRoollShtRoutes.cjs");
const ScanSMTFIN = require("./routes/ScanSMTSerialShtFINManyShtRoutes.cjs");
const ScanSheetMOTTime = require("./routes/ScanSheetMOTTimeRoutes.cjs");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/Common", commonRoutes);
app.use("/api", LoginService);
app.use("/api", MenuService);
app.use("/api", ScanSMTFIN);
app.use("/api", ScanSMTRollSht);
app.use("/api", ScanSheetMOTTime);
app.use("/api", sheetmaster);
app.use("/api", productmaster);
app.use("/api", serialmaster);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
