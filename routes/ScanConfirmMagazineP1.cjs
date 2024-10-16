const express = require("express");
const router = express.Router();
const ScanConfirmMagazineP1 = require("../WorkService/Model_ScanConfirmMagazineP1.cjs");

router.post("/GetCountSerialByLotMagazine", ScanConfirmMagazineP1.GetCountSerialByLotMagazine);
router.post("/SetManualConfirmMagazine", ScanConfirmMagazineP1.SetManualConfirmMagazine);
router.post("/GetSerialMagazineByLot", ScanConfirmMagazineP1.GetSerialMagazineByLot);

module.exports = router;