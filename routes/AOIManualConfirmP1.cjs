const express = require("express");
const router = express.Router();
const AOIManualConfirmP1 = require("../WorkService/Model_AOIManualConfirmP1.cjs");

router.post("/Update_aoiandspi_rslt", AOIManualConfirmP1.Update_aoiandspi_rslt);
router.post("/Search_aoiandspi_rslt", AOIManualConfirmP1.Search_aoiandspi_rslt);

module.exports = router;