const express = require("express");
const router = express.Router();
const FinalGate = require("../WorkService/Model_FinalGate.cjs");

 router.post("/GetFgh_inspect_count", FinalGate.GetSerialTestResultManyOnlyGood);

 
 
module.exports = router;
