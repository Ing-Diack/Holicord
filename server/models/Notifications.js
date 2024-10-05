/****** le model de l'utilisateur ****/
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
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
    parcours: {
      type: DataTypes.STRING,
      allowNull: false,
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
  return Notification;
};
/****fin du modèl de l'utilisateur */
