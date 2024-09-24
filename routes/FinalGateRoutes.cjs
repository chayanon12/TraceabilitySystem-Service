const express = require("express");
const router = express.Router();
const FinalGate = require("../WorkService/Model_FinalGate.cjs");

router.post("/GetSerialTestResultManyTableConfirm", FinalGate.GetSerialTestResultManyTableConfirm);

 
 
module.exports = router;
