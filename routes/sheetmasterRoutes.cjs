const express = require("express");
const router = express.Router();
const sheetmaster = require("../WorkService/sheetmaster.cjs");

router.post("/searchCodeName", sheetmaster.postCodeName);
router.post("/insSheet_Master", sheetmaster.insertSheet_Master);
router.post("/updateSheet_Master", sheetmaster.updateSheet_Master);
router.post("/delSheet_Master", sheetmaster.delSheet_Master);
router.post("/CheckSHTCode", sheetmaster.postSHTCode);

module.exports = router;