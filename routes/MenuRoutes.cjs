const express = require("express");
const router = express.Router();
const Menu = require("../Conncetion/menuService.cjs");

router.get("/current-date", Menu.getCurrentDate);
router.post("/MenuName", Menu.Menuname);
router.post("/MenuHome", Menu.MenuHome);

module.exports = router;