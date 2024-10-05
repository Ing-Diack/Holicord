const { StartUp } = require("../models");

exports.registerStarUp = async (req, res) => {
  //  const Data = JSON.parse(req.body.data);
  const startUp = new StartUp({
    ...req.body,
  });
  startUp
    .save()
    .then(() =>
      res.status(201).json({ message: "Votre startUp a été bien enregistré " })
    )
    .catch((error) => res.status(401).json({ error }));
};
exports.getOneStartUp = async (req, res, next) => {
  const result = await StartUp.findOne({ where: { ID_Ceo: req.params.id } });
  res.status(200).json(result);
};
exports.getAllStartUp = async (req, res, next) => {
  const result = await StartUp.findAll();
  res.status(200).json(result);
};
