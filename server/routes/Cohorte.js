const express = require("express");
const router = express.Router();

/***Router for User */
const cohorteCtrl = require("../controllers/Cohorte");
router.post("/", cohorteCtrl.signUp);
router.get("/all", cohorteCtrl.getAllCohorte);
router.get("/all/:id", cohorteCtrl.getAllCohorteForThisId);
router.get("/:id", cohorteCtrl.getOneCohorte);
router.put("/update/:id", cohorteCtrl.updateCohorte);
module.exports = router;
