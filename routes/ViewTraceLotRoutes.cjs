const express = require("express");
const router = express.Router();
const ViewTraceLot = require("../WorkService/Model_ViewTraceLot.cjs");

router.post("/GetDataViewLot",ViewTraceLot.getdataviewlot);
router.post("/GetDataViewLot2",ViewTraceLot.getdataviewlot2);
router.post("/GetDataViewLot3",ViewTraceLot.getdataviewlot3);
router.post("/fnlotresultfinalgatedata",ViewTraceLot.fnlotresultfinalgatedata);

module.exports = router;