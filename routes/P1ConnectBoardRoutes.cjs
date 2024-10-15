const express = require("express");
const router = express.Router();
const P1ConnectBoard = require("../WorkService/Model_P1ConnectBoard.cjs")

 router.post("/GetConfirmToolingByLot", P1ConnectBoard.GetConfirmToolingByLot);
 router.post("/GetCheckConfirmMagazineBySerial", P1ConnectBoard.GetCheckConfirmMagazineBySerial);
 

 
 
module.exports = router;
