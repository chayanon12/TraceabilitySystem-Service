const express = require("express");
const router = express.Router();
const ReJudgement = require("../WorkService/Model_ReJudgement.cjs");

router.post("/ReJudgement/getData", ReJudgement.GetData);
router.post("/ReJudgement/insertData", ReJudgement.insertData);
router.get("/ReJudgement/getCombo", ReJudgement.GetCombo);
module.exports = router;