const { Utilisateur } = require("../models");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendVerificationMail = require("../utils/sendVerificationMail");
const createToken = (_id) => {
  return jwt.sign({ _id }, "secret token key", { expiresIn: "2d" });
};
exports.signUp = async (req, res) => {
  const utilisateur = new Utilisateur({
    ...req.body,
    emailToken: crypto.randomBytes(64).toString("hex"),
  });

  sendVerificationMail(utilisateur);
  utilisateur
    .save()
    .then((utilisateur) => {
      res.status(200).json({
        email: utilisateur.email,
        isVerified: utilisateur.isVerified,
        role: utilisateur.role,
        message: "Objet enregistré les infos !",
      });
    })
    .catch((error) => res.status(400).json({ error }));
};
exports.signUpMembre = async (req, res) => {
  const utilisateur = new Utilisateur({
    ...req.body,
    emailToken: crypto.randomBytes(64).toString("hex"),
  });
  bycript
    .hash(req.body.password, 10)
    .then((hash) => {
      utilisateur.password = hash;
      utilisateur
        .save()
        .then((utilisateur) => {
          res.status(200).json({
            email: utilisateur.email,
            isVerified: utilisateur.isVerified,
            role: utilisateur.role,
            message: "Le compte a été crée avec succès !",
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.verifyMail = async (req, res) => {
  try {
    const emailToken = req.body.emailToken;
    if (!emailToken) return res.status(404).json("EmailToken not found .....");
    const utilisateur = await Utilisateur.findOne({
      where: { emailToken: emailToken },
    });
    if (utilisateur) {
      utilisateur.emailToken = null;
      utilisateur.isVerified = true;
      await utilisateur.save();
      const token = createToken(utilisateur._id);
      res.status(200).json({
        _id: utilisateur._id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role,
        token,
        isVerified: utilisateur?.isVerified,
      });
    } else res.status(404).json("Email verification failled, invalide token");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
exports.definedPassword = async (req, res) => {
  const { password, email } = req.body;
  if (!email) return res.status(404).json("email not found .....");
  const utilisateur = await Utilisateur.findOne({ where: { email: email } });
  if (utilisateur) {
    bycript
      .hash(password, 10)
      .then((hash) => {
        utilisateur.password = hash;
        utilisateur
          .save()
          .then((utilisateur) =>
            res.status(201).json({ message: "successful defined password ..." })
          )
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const utilisateur = await Utilisateur.findOne({ where: { email: email } });
    if (!utilisateur) {
      return res.status(401).json({
        message: "Il n'existe pas un compte qui correspond a votre email !",
      });
    } else {
      if (utilisateur.isVerified == 1) {
        bycript
          .compare(password, utilisateur.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ message: "Vos identifiants sont incorrects !" });
            }
            const token = createToken(utilisateur._id);
            utilisateur.numberConnexion = utilisateur.numberConnexion + 1;
            utilisateur.save();
            res.status(200).json({
              id: utilisateur.id,
              nom: utilisateur.nom,
              prenom: utilisateur.prenom,
              tel: utilisateur.tel,
              email: utilisateur.email,
              pays: utilisateur.pays,
              role: utilisateur.role,
              description: utilisateur.description,
              siteWeb: utilisateur.siteWeb,
              incubateur: utilisateur.incubateur,
              numberConnexion: utilisateur.numberConnexion,
              token: token,
            });
          })
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(401).json({
          message:
            "Merci d'activer votre compte à travers le lien envoyé par votre adresse mail ",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
exports.updateUlisateur = async (req, res, next) => {
  const id = req.body.id;
  const utilisateur = await Utilisateur.findOne({ where: { id: id } });
  if (!utilisateur) {
    return res.status(200).json(error);
  } else {
    utilisateur.nom = req.body.userData.nom;
    utilisateur.prenom = req.body.userData.prenom;
    utilisateur.email = req.body.userData.email;
    utilisateur.tel = req.body.userData.tel;
    utilisateur.pays = req.body.userData.pays;
    utilisateur
      .save()
      .then((utilisateur) =>
        res.status(201).json({ message: "successful defined password ..." })
      )
      .catch((error) => res.status(500).json({ error }));
  }
};
exports.updateUlisateurIncubateur = async (req, res, next) => {
  const { id } = req.body.id;
  console.log(" le paramettre id envoyé", id);
  const utilisateur = await Utilisateur.findOne({ where: { _id: id } });
  if (!utilisateur) {
    return res.status(200).json(error);
  } else {
    utilisateur.nom = req.body.userData.nom;
    utilisateur.email = req.body.userData.email;
    utilisateur.tel = req.body.userData.tel;
    utilisateur.pays = req.body.userData.pays;
    utilisateur.description = req.body.userData.description;
    utilisateur
      .save()
      .then((utilisateur) =>
        res.status(201).json({ message: "successful defined password ..." })
      )
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.getAllUtilisateur = async (req, res, next) => {
  const result = await Utilisateur.findAll();
  res.status(200).json(result);
};
exports.getAllUtilisateurForThisId = async (req, res, next) => {
  const result = await Utilisateur.findAll({
    where: { ID_PARENT: req.params.id },
  });
  res.status(200).json(result);
};

exports.DeleteOneUtilisateur = async (req, res, next) => {
  console.log(req.params.id);
  await Utilisateur.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({
        message: `Suppression avec succes ID=${req.params.id}`,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Oups il y a eu un problème !!!",
      });
    });
};
exports.getOneUtilisateur = async (req, res, next) => {
  const result = await Utilisateur.findOne({ where: { id: req.params.id } });
  res.status(200).json(result);
};
