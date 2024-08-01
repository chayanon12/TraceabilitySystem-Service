const express = require("express");
const router = express.Router();
const ELT_Type = require("../WorkService/Model_ELTType.cjs");



router.get("/ELTtype/getproduct", ELT_Type.GetELTProduct);
router.get("/ELTtype/gettype", ELT_Type.GetELTType);
router.post("/ELTtype/gettypebyproduct", ELT_Type.GetELTTypeByProduct);
router.post("/ELTtype/deleteData",ELT_Type.DeleteData)

module.exports = router;
