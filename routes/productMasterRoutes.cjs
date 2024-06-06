const express = require("express");
const router = express.Router();
const productmaster = require("../WorkService/productmaster.cjs");



router.post("/searchFactory", productmaster.searchFactory);
router.post("/Factory", productmaster.getFactory);
router.post("/SerialStructure", productmaster.getSerialStructure);
router.post("/SheetStructure", productmaster.getSheetStructure);
router.post("/SheetType", productmaster.getSheetType);
router.post("/ProceesControl", productmaster.getProceesControl);
router.post("/insProduct_Master", productmaster.insertProduct_Master);
router.post("/updateProduct_Master", productmaster.updateProduct_Master);
router.post("/delProduct_Master", productmaster.deleteProduct_Master);


module.exports = router;
