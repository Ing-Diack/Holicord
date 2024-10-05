/****** le model de l'utilisateur ****/
module.exports = (sequelize, DataTypes) => {
  const Souscription = sequelize.define("Souscription", {
    ID_CEO: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ceoEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    incubateurID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    incubateurEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "AttenteValid",
    },
    Cohorte: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Souscription;
};
/****fin du modèl de l'utilisateur */
