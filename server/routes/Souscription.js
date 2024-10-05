const express = require("express");
const router = express.Router();

/***Router for User */
const souscriptionCtrl = require("../controllers/Souscription");
router.post("/", souscriptionCtrl.signUp);
router.get("/all", souscriptionCtrl.getAllSouscription);
router.patch("/updateSouscription/:id", souscriptionCtrl.updateSouscription);
router.get("/:object_query", souscriptionCtrl.getAllSouscriptonByQueryObject);
router.get("/all/:object_Cohorte", souscriptionCtrl.getAllSouscriptonByCohorte);
router.get("/:id", souscriptionCtrl.getOneSouscription);
router.delete("/supprimer/:id", souscriptionCtrl.DeleteOneSouscripton);

module.exports = router;
