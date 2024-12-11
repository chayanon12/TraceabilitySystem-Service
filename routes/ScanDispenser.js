const express = require("express");
const router = express.Router();
const Dispenser = require("../WorkService/Model_ScanDispenser.cjs");

// router.post('/set_smt_proc_flow_dispenser',Dispenser.SET_SMT_PROC_FLOW_DISPENSER_CB);

router.get('/GetDispenserRecordTimeData',Dispenser.GetDispenserRecordTimeData);
router.post('/DeleteDispenserRecordTimeData',Dispenser.DeleteDispenserRecordTimeData);
router.post('/CallSMTDispenserRecordTimeResult',Dispenser.CallSMTDispenserRecordTimeResult);



module.exports = router;
