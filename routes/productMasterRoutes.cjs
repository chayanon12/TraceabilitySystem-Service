const express = require("express");
const router = express.Router();
const productmaster = require("../WorkService/productmaster.cjs");



router.post("/getdatatable", productmaster.getdatatable);
router.post("/getupdatecount", productmaster.getupdatecount);
router.post("/insertProductMst", productmaster.insertProduct_Master);
router.post("/updateProductMst", productmaster.updateProduct_Master);


module.exports = router;
