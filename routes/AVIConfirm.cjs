const express = require("express");
const router = express.Router();
const AVIconfrim = require("../WorkService/Model_AVIconfirm.cjs");




router.post("/AVIconfirm/getData",AVIconfrim.GetData);
router.post("/AVIconfirm/updateData",AVIconfrim.UpdateData);
router.get("/AVIconfirm/GetSerialBoxProductByProduct",AVIconfrim.GetSerialBoxProductByProduct);


module.exports = router;
