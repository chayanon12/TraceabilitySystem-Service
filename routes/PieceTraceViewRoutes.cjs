const express = require("express");
const router = express.Router();
const PieceTraceView = require("../WorkService/Model_PieceTraceView.cjs");

router.post("/GetSerialNo", PieceTraceView.GetSerialNo);
router.post("/getdataproduct", PieceTraceView.getdataproduct);
router.post("/getproductname", PieceTraceView.getproductname);
router.post("/getproductmst", PieceTraceView.getproductmst);
router.post("/getlotsheetserial", PieceTraceView.getlotsheetserial);
router.post("/getspifront", PieceTraceView.getspifront);
router.post("/getspiresult", PieceTraceView.getspiresult);
router.post("/getresult", PieceTraceView.getresult);
router.post("/getspiback", PieceTraceView.getspiback);
router.post("/getspi", PieceTraceView.getspi);
router.post("/getpreaoifront", PieceTraceView.getpreaoifront);
router.post("/getpreaoifronttelse", PieceTraceView.getpreaoifrontelse);
router.post("/getaoi", PieceTraceView.getaoi);
router.post("/getaoi2", PieceTraceView.getaoi2);
router.post("/getaoi3", PieceTraceView.getaoi3);
router.post("/getaoicoating", PieceTraceView.getaoicoating);
router.post("/getaoicoating2", PieceTraceView.getaoicoating2);
router.post("/getaoicoating3", PieceTraceView.getaoicoating3);
router.post("/getinspectionresult", PieceTraceView.getinspectionresult);
router.post("/getreject", PieceTraceView.getreject);
router.post("/gettouchup", PieceTraceView.gettouchup);
router.post("/getfinalinspection", PieceTraceView.getfinalinspection);
router.post("/getbending", PieceTraceView.getbending);
router.post("/getelt", PieceTraceView.getelt);
router.post("/getkeytype", PieceTraceView.getkeytype);
router.post("/getxrayresult", PieceTraceView.getxrayresult);
router.post("/getbarcodegrade", PieceTraceView.getbarcodegrade);
router.post("/GetPlasmaDataResultBySerial", PieceTraceView.GetPlasmaDataResultBySerial);
router.post("/GetSerialAOMEFPCResult", PieceTraceView.GetSerialAOMEFPCResult);
router.post("/GetSerialAVIResult", PieceTraceView.GetSerialAVIResult);
router.post("/GetSerialAVIBadmarkResult", PieceTraceView.GetSerialAVIBadmarkResult);
router.post("/GetMCNO", PieceTraceView.GetMCNO);
router.post("/getfinalgatehistory", PieceTraceView.getfinalgatehistory);
router.post("/getaoiresult", PieceTraceView.getaoiresult);
router.post("/GetOSTResultPiece", PieceTraceView.GetOSTResultPiece);
router.post("/getposition", PieceTraceView.getposition);
router.post("/getpreresult", PieceTraceView.getpreresult);
router.post("/getpreresult2", PieceTraceView.getpreresult2);
router.post("/getpreresult3", PieceTraceView.getpreresult3);
router.post("/getrejectresult", PieceTraceView.getrejectresult);
router.post("/getTouchupresult", PieceTraceView.getTouchupresult);
router.post("/getCheckerresult", PieceTraceView.getCheckerresult);
router.post("/getCheckerresultdata2", PieceTraceView.getCheckerresultdata2);
router.post("/getCheckerresultdata3", PieceTraceView.getCheckerresultdata3);
router.post("/getaoicoaresult", PieceTraceView.getaoicoaresult);

module.exports = router;