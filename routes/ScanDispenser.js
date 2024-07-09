const express = require("express");
const router = express.Router();
const Dispenser = require("../WorkService/Model_ScanDispenser.cjs");

router.post('/Dispenser/set_smt_proc_flow_dispenser',Dispenser.SET_SMT_PROC_FLOW_DISPENSER_CB);

module.exports = router;

