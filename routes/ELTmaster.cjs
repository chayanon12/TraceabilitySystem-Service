const express = require("express");
const router = express.Router();
const ELT_master = require("../WorkService/Model_ELTmaster.cjs");

router.get('/ELTmaster/GetELTmasterCombo',ELT_master.GetELTmasterCombo);
router.post('/ELTmaster/GetELT_search',ELT_master.GetELT_search);
router.post('/ELTmaster/Submit_ELT',ELT_master.Submit_ELT);



module.exports = router;
