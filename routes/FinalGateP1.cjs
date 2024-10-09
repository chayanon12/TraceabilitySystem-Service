const express = require("express");
const router = express.Router();
const FinalGateP1 = require("../WorkService/Model_FinalGateP1.cjs");

router.post("/Get_SPI_AOI_RESULT_P1",FinalGateP1.Get_SPI_AOI_RESULT_P1);




module.exports = router;
