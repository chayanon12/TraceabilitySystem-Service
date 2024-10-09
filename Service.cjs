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
const ConfirmBarcodeGrade = require("./routes/ConfirmBarcodeGrade.cjs")
const ScanSheetOvenTime = require("./routes/ScanSheetOvenTime.cjs");
const Rejcet = require("./routes/Reject.cjs");
const ELTmaster = require("./routes/ELTmaster.cjs");
const SheetBinCheck  = require("./routes/SheetBinCheck.cjs");
const Dispenser = require("./routes/ScanDispenser.js");
const ScanSMTPlasma = require("./routes/ScanSMTPlasmaStopStartRoutes.cjs");
const ScanSMTSerialControl = require("./routes/ScanSMTSerialControlTimeRoutes.cjs");
const SpotHeat = require("./routes/ScanSMTSerialSpotHeat.cjs");
const ScanSMTSerialShtConfirm = require("./routes/ScanSMTSerialShtConfirmRoutes.cjs");
const ELT_Type = require("./routes/ELTType.cjs");
const ScanSMTSerialBackend = require("./routes/ScanSMTSerialBackendConfirmRoutes.cjs");
const AVIconfirm = require("./routes/AVIConfirm.cjs");
const ScanAutoBendingTime = require("./routes/ScanAutoBendingTime.cjs");
const ReJudgement = require("./routes/ReJudgement.cjs");
const PackingOnlyGood  = require("./routes/ScanSMTSerialPcsBoxOnlyGood.cjs");
const ScanSMTSerialSht = require("./routes/ScanSMTSerialShtRoutes.cjs");
const AOIConfirmResult = require("./routes/AOIConfirmResultRoutes.cjs");
const ChangPatial = require("./routes/ChangPatialRoutes.cjs");
const PackingConfirmSheet = require("./routes/PackingConfirmSheet.cjs");
const FinalGate = require("./routes/FinalGateRoutes.cjs");
const SerialReplaceRecord = require("./routes/SerialReplaceRecordTime.cjs")
const FVIbadmark =  require("./routes/RptLotFVIBadmarkView.cjs")
const ConfirmRollLeaf = require("./routes/ScanSMTConnectRollConfirm.cjs");
const ChangeSerial = require("./routes/ChangeSerial.cjs");
const SMTDeleteData = require("./routes/SMTDeleteDataRoutes.cjs");
const ScanAVIConfirmResult = require("./routes/ScanAVIConfirmResult.cjs");
const PieceTraceView = require("./routes/PieceTraceViewRoutes.cjs");
const ViewTraceLot = require("./routes/ViewTraceLotRoutes.cjs");
const ViewTraceSheet = require("./routes/ViewTraceSheet.cjs");
const SheetBadmarkReport = require("./routes/SheetBadmarkReport.cjs");
const ScanSMTSerialXrayConfirm = require("./routes/ScanSMTSerialXrayConfirm.cjs");
const Result = require("./routes/Result.cjs");
const cors = require('cors');
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // เพิ่ม headers ที่จำเป็น
}));
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
app.use("/api/ScanFin/", ScanSMTFIN);
app.use("/api/SMTRoollSht", ScanSMTRollSht);
app.use("/api", ScanSheetMOTTime);
app.use("/api", sheetmaster);
app.use("/api", productmaster);
app.use("/api", serialmaster);
app.use("/api", ScanShtInspect);
app.use('/api', ScanSheetBakeTime);
app.use("/api", ScanShtInspectXOut);
app.use("/api/Barcode", ConfirmBarcodeGrade);
app.use("/api", ScanSheetOvenTime);
app.use("/api", Rejcet);
app.use("/api", ELTmaster)
app.use("/api", SheetBinCheck)
app.use("/api", Dispenser);
app.use("/api", ScanSMTPlasma);
app.use("/api", ScanSMTSerialControl);
app.use("/api", SpotHeat);
app.use("/api", ScanSMTSerialShtConfirm);
app.use("/api", ELT_Type);
app.use("/api", ScanSMTSerialBackend);
app.use("/api",ELT_Type)
app.use("/api",AVIconfirm)
app.use("/api", ScanAutoBendingTime);
app.use("/api", ReJudgement);
app.use("/api", PackingOnlyGood);
app.use("/api", ScanSMTSerialSht);
app.use("/api", PackingConfirmSheet);
app.use("/api/ChangPatial", ChangPatial);
app.use("/api/AOIConfirmResult", AOIConfirmResult);
app.use("/api/FinalGate", FinalGate);
app.use("/api", SerialReplaceRecord);
app.use("/api", FVIbadmark);
app.use("/api", ConfirmRollLeaf);
app.use("/api", ChangeSerial);
app.use("/api/SMTDeleteData", SMTDeleteData);
app.use("/api", ScanAVIConfirmResult);
app.use("/api/ViewTracePiece", PieceTraceView);
app.use("/api/ViewTraceLot", ViewTraceLot);
app.use("/api", ScanSMTSerialXrayConfirm);
app.use("/api/SheetBadmarkReport", SheetBadmarkReport);
app.use("/api/ViewTraceSheet", ViewTraceSheet);
app.use("/api/Result", Result);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
