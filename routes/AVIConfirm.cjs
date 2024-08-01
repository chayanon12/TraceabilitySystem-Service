const express = require("express");
const router = express.Router();
const AVIconfrim = require("../WorkService/Model_AVIconfirm.cjs");




router.post("/AVIconfirm/getData",AVIconfrim.GetData);
router.post("/AVIconfirm/updateData",AVIconfrim.UpdateData);

module.exports = router;
