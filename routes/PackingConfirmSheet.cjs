const express = require("express");
const router = express.Router();
const PackingConfirmSheet = require("../WorkService/Model_PackingConfirmSheet.cjs");

router.post('/GetConfirmSheetDataAllByLot',PackingConfirmSheet.GetConfirmSheetDataAllByLot);
router.post('/SetConfirmPackingSheet',PackingConfirmSheet.SetConfirmPackingSheet);


module.exports = router;
