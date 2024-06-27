const express = require("express");
const router = express.Router();
const Login = require("../Conncetion/LoginService.cjs");


router.post("/login", Login.login);
router.get("/verifyToken", Login.verifyToken);
router.get("/getIPaddress", Login.getIPaddress);

module.exports = router;









