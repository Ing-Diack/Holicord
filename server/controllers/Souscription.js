const { Souscription } = require("../models");
const url = require("url");

exports.signUp = async (req, res) => {
  const { ceoEmail, incubateurEmail } = req.body;
  const souscript = await Souscription.findOne({
    where: { incubateurEmail: incubateurEmail, ceoEmail: ceoEmail },
  });
  console.log(souscript);
  if (souscript) {
    return res
      .status(401)
      .json({ message: "Vous êtes déjà souscris au près de cet incubateur," });
  } else {
    const souscription = new Souscription({
      ...req.body,
    });
    souscription
      .save()
      .then((souscription) => {
        res.status(200).json({
          message: "Objet enregistré les infos !",
        });
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
exports.getAllSouscription = async (req, res, next) => {
  const result = await Souscription.findAll();
  res.status(200).json(result);
};
exports.getAllSouscriptonByQueryObject = async (req, res, next) => {
  const result = await Souscription.findAll({
    where: { statut: req.params.object_query },
  });
  res.status(200).json(result);
};
exports.getAllSouscriptonByCohorte = async (req, res, next) => {
  console.log(req.params.object_Cohorte);
  const result = await Souscription.findAll({
    where: { Cohorte: req.params.object_Cohorte },
  });
  console.log("Le resultat", result);
  res.status(200).json(result);
};
exports.updateSouscription = async (req, res, next) => {
  await Souscription.update(req.body, { where: { id: req.params.id } });
  res
    .status(200)
    .json({ message: "Félicitations, Votre Candidature a été acceptéé" });
};
exports.DeleteOneSouscripton = async (req, res, next) => {
  console.log(req.params.id);
  await Souscription.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({
        message: `La candidature a été supprimée avec succes `,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Oups il y a eu un problème !!!",
      });
    });
};
exports.getOneSouscription = async (req, res, next) => {
  const result = await Souscription.findOne({ where: { id: req.params.id } });
  res.status(200).json(result);
};
