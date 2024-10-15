const express = require("express");
const router = express.Router();
const ScanConfirmMagazineP1 = require("../WorkService/Model_ScanConfirmMagazineP1.cjs");

router.post("/GetCountSerialByLotMagazine", ScanConfirmMagazineP1.GetCountSerialByLotMagazine);


module.exports = router;