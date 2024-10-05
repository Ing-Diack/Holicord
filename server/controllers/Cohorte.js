const { Cohorte } = require("../models");

exports.signUp = async (req, res) => {
  const cohorte = new Cohorte({
    ...req.body,
  });
  cohorte
    .save()
    .then((cohorte) => {
      res.status(200).json({
        message: "VOtre cohorte a été bien crée",
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllCohorte = async (req, res, next) => {
  const result = await Cohorte.findAll();
  res.status(200).json(result);
};
/*
  exports.updateCohorte = async (req, res) => {
      const { dateDebut, dateFin, id } = req.body;
      if (!email) return res.status(404).json("email not found .....");
      const cohorte = await Cohorte.findOne({ where: { idPro: id } });
      if (cohorte) {
          cohorte.dateDebut = dateDebut;
          cohorte.dateFin = dateFin;
          cohorte.save();
      }
  }*/
exports.getAllCohorteForThisId = async (req, res, next) => {
  const result = await Cohorte.findAll({
    where: { idPro: req.params.id },
  });
  res.status(200).json(result);
};
exports.updateCohorte = async (req, res, next) => {
  Cohorte.updateOne({ id: req.params.id }, { ...req.body, id: req.params.id })
    .then(() => res.status(200).json({ message: "La Cohorte a été lancée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneCohorte = async (req, res, next) => {
  const result = await Cohorte.findOne({ where: { id: req.params.id } });
  res.status(200).json(result);
};
