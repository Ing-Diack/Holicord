const { Message } = require("../models");

exports.signUp = async (req, res) => {
  const message = new Message({
    ...req.body.comments,
  });
  console.log(req.body.comments);
  message
    .save()
    .then((message) => {
      res.status(200).json({
        message: "Votre message a été bien envoyé",
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllMessages = async (req, res, next) => {
  const result = await Messages.findAll();
  res.status(200).json(result);
};
