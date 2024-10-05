/****** le model de l'utilisateur ****/
module.exports = (sequelize, DataTypes) => {
  const StartUp = sequelize.define("StartUp", {
    ID_Ceo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    presentationCeo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ceoEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: "email address already in use",
      },
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    siteWeb: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    choix: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phaseFinancement: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    partenaire: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lienYoutube: {
      type: DataTypes.STRING,
    },
  });
  return StartUp;
};
/****fin du modèl de l'utilisateur */
