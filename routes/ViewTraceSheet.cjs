const express = require("express");
const router = express.Router();
const ViewTraceSheet = require("../WorkService/Model_ViewTraceSheet.cjs");

router.post("/GetLotSheet",ViewTraceSheet.GetLotSheet);
router.post("/GetProductSheet",ViewTraceSheet.GetProductSheet);
router.post("/GetSPI",ViewTraceSheet.GetSPI);
router.post("/GetPreAOI",ViewTraceSheet.GetPreAOI);
router.post("/GetAOI",ViewTraceSheet.GetAOI);
router.post("/GetAOI_Coating",ViewTraceSheet.GetAOI_Coating);
router.post("/Getinspection",ViewTraceSheet.Getinspection);
router.post("/Get_LOT_SHEET_SERIAL",ViewTraceSheet.Get_LOT_SHEET_SERIAL);
router.post("/GetFPCSMPJPcsCavity",ViewTraceSheet.GetFPCSMPJPcsCavity);
router.post("/GetSerialAOIEFPCResult",ViewTraceSheet.GetSerialAOIEFPCResult);
router.post("/GetSerialOSTResult",ViewTraceSheet.GetSerialOSTResult);
router.post("/GetSerialAVIResult",ViewTraceSheet.GetSerialAVIResult);
router.post("/GetSPI_Front",ViewTraceSheet.GetSPI_Front);
router.post("/GetSPI_RSLT",ViewTraceSheet.GetSPI_RSLT);
router.post("/GetRslt_Header",ViewTraceSheet.GetRslt_Header);
router.post("/GetPreSPI",ViewTraceSheet.GetPreSPI);
router.post("/GetPRD_NG_DETAIL",ViewTraceSheet.GetPRD_NG_DETAIL);
router.post("/GetAoi_rslt",ViewTraceSheet.GetAoi_rslt);
router.post("/GetAOI_COA_RSLT",ViewTraceSheet.GetAOI_COA_RSLT);
router.post("/getxray",ViewTraceSheet.getXRAY);
router.post("/getxray2",ViewTraceSheet.getXRAY2);
router.post("/GetFPCPcsNoBySMPJCavity",ViewTraceSheet.GetFPCPcsNoBySMPJCavity);
router.post("/GetSerialAVIBadmarkResult",ViewTraceSheet.GetSerialAVIBadmarkResult);
router.post("/GetSMTConnectShtPcsCavity",ViewTraceSheet.GetSMTConnectShtPcsCavity);














module.exports = router;