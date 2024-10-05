const express = require('express');
const router = express.Router();

/***Router for User */
const messageCtrl = require("../controllers/Message");
router.post("/", messageCtrl.signUp);
router.get("/all", messageCtrl.getAllMessages);
module.exports = router;