const express = require("express");
const router = express.Router();
const ChangPatial = require("../WorkService/Model_ChangPatial.cjs");

 router.post("/GetFgh_inspect_count", ChangPatial.GetFgh_inspect_count);
 router.post("/Set_UpdateGateheader", ChangPatial.Set_UpdateGateheader);
 
 
module.exports = router;
