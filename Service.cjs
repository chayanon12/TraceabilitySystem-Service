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
const ScanShtInspect = require("./routes/ScanSheetInspectRoutes.cjs");
const ScanSheetBakeTime = require("./routes/ScanSheetBaketime.cjs");
const ScanShtInspectXOut = require("./routes/ScanSheetInspectXOutRoutes.cjs");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
    return res.sendStatus(200);  
  }
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
app.use("/api", ScanShtInspect);
app.use('/api',ScanSheetBakeTime);
app.use("/api", ScanShtInspectXOut);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
