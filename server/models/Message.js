/****** le model de l'utilisateur ****/
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    ID_Expediteur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ID_Destinateur: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Message;
};
/****fin du modèl de l'utilisateur */
