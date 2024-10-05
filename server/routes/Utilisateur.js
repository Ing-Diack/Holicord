const express = require("express");
const router = express.Router();

/***Router for User */
const utilisateurCtrl = require("../controllers/Utilisateur");
router.post("/signUp", utilisateurCtrl.signUp);
router.post("/signUpMembre", utilisateurCtrl.signUpMembre);
router.post("/verifyMail", utilisateurCtrl.verifyMail);
router.post("/definedPassword", utilisateurCtrl.definedPassword);
router.post("/signIn", utilisateurCtrl.signIn);
router.post("/updateUtilisateur", utilisateurCtrl.updateUlisateur);
router.post(
  "/updateUtilisateurIncubateur",
  utilisateurCtrl.updateUlisateurIncubateur
);
router.get("/all", utilisateurCtrl.getAllUtilisateur);
router.get("/:id", utilisateurCtrl.getOneUtilisateur);
router.get(
  "/AllUtilisateurForThisId/:id",
  utilisateurCtrl.getAllUtilisateurForThisId
);
router.delete("/supprimer/:id", utilisateurCtrl.DeleteOneUtilisateur);

module.exports = router;
