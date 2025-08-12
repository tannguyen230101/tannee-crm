const express = require("express");

const Router = express.Router();

Router.use("/auth", require("./auth.route"));

module.exports = Router;