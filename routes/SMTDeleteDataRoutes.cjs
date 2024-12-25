const express = require("express");
const router = express.Router();
const SMTDeleteData = require("../WorkService/Model_SMTDeleteData.cjs");

router.post("/getSheetno", SMTDeleteData.GetSheetno);
router.post("/getRollLeaf", SMTDeleteData.GetRollLeaf);
router.post("/DeleteDataSheet", SMTDeleteData.DeleteDataSheet);
router.post("/DeleteDataRollleaf", SMTDeleteData.DeleteDataRollleaf);
router.post("/getELTResult", SMTDeleteData.GetELTResult);
router.post("/DeleteELT", SMTDeleteData.DeleteELT);
router.post("/getFinalGateResult", SMTDeleteData.GetFinalGateResult);
router.post("/FinalDelete", SMTDeleteData.FinalDelete);

module.exports = router;