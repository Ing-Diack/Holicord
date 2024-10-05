/****** le model de l'utilisateur ****/
module.exports = (sequelize, DataTypes) => {
  const Cohorte = sequelize.define("Cohorte", {
    idPro: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nomPro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Cette cohorte existe",
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    programme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ETAT: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    NB_PARTICIPANT: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    dateDebut: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dateFin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  return Cohorte;
};
/****fin du modèl de l'utilisateur */
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
