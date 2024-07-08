const express = require("express");
const router = express.Router();
const Rejcet = require("../WorkService/Model_Rejcet.cjs");

router.get('/reject/getrejectcombo',Rejcet.GetRejcetCombo);
router.post('/reject/getsearchbyserial',Rejcet.GetSearchBySerial);
router.post('/reject/getsearchbylot',Rejcet.GetSearchBylot);
router.post('/reject/setsubmitdata',Rejcet.SetSubmitData);


module.exports = router;
