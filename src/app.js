const express = require("express");
const connectMongo = require("./infrastructures/database/mongoClient");
const errorHandler = require("./interfaces/http/middlewares/errorHandler");
const Router = require('./interfaces/http/routes/index')

const app = express();
app.use(express.json());

connectMongo();

app.use("/crm-v1", Router)

app.use(errorHandler);

module.exports = app;
