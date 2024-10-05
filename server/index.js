const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const db = require("./models");
// routers
const utilisateurRouter = require("./routes/Utilisateur");
app.use("/utilisateur", utilisateurRouter);
//**** */
const startUpRouter = require("./routes/StartUp");
app.use("/startUp", startUpRouter);

//*****/*
const souscriptionRouter = require("./routes/Souscription");
app.use("/souscription", souscriptionRouter);

/******/
const cohorteRouter = require("./routes/Cohorte");
app.use("/cohorte", cohorteRouter);

//*****/
const cohorteMessage = require("./routes/Message");
app.use("/message", cohorteMessage);

//*****/

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
