const express = require("express");
const router = express.Router();
const Common = require("../WorkService/Model_Common.cjs");

router.get("/GetProductData", Common.GetProductData);
 router.post("/getProductDataByLot", Common.GetProductNameByLot);

module.exports = router;
