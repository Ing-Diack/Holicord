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
    NB_INSCRIPTION: {
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
