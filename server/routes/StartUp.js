const express = require('express');
const router = express.Router();
const startController = require("../controllers/StartUp");
router.post("/", startController.registerStarUp);
router.get("/all", startController.getAllStartUp);
router.get("/:id", startController.getOneStartUp);

module.exports = router;