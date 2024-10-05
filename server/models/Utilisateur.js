/****** le model de l'utilisateur ****/
module.exports = (sequelize, DataTypes) => {
  const Utilisateur = sequelize.define("Utilisateur", {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    tel: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    email: {
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
    pays: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    incubateur: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    siteWeb: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emailToken: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    numberConnexion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ID_PARENT: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  });
  return Utilisateur;
};
