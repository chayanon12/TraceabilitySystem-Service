const express = require("express");
const router = express.Router();
const Login = require("../Conncetion/LoginService.cjs");


router.post("/login", Login.login);
router.get("/getIPaddress", Login.getNewIPaddress);
router.get("/getNewIPaddress", Login.getIPaddress);
router.post ("/VerifyToken", Login.VerifyToken);

module.exports = router;









