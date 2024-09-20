const express = require("express");
const router = express.Router();
const SMTDeleteData = require("../WorkService/Model_SMTDeleteData.cjs");

router.post("/DeleteDataSheet", SMTDeleteData.DeleteDataSheet);
router.post("/DeleteDataRollleaf", SMTDeleteData.DeleteDataRollleaf);

module.exports = router;