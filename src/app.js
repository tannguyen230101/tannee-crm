const express = require("express");
const connectMongo = require("./infrastructures/database/mongoClient");
const errorHandler = require("./interfaces/http/middlewares/errorHandler");
const Router = require('./interfaces/http/routes/index');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectMongo();

app.use("/crm-v1", Router)

app.use(errorHandler);

module.exports = app;
