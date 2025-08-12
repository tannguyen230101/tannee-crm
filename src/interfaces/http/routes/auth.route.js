const AuthController = require("../controllers/auth.controller");
const express = require("express");
const firebaseAuth = require("../middlewares/firebaseAuthMiddleware");

const AuthRoute = express.Router();

AuthRoute.post("/login", AuthController.login);
AuthRoute.post("/register", AuthController.register);
AuthRoute.post("/confirm-email", AuthController.confirmEmail);
AuthRoute.post("/forgot-password", AuthController.forgotPassword);
AuthRoute.post("/reset-password", AuthController.resetPassword);
AuthRoute.post("/change-password", firebaseAuth, AuthController.changePassword);
AuthRoute.post("/refresh-token", firebaseAuth, AuthController.refreshToken);

module.exports = AuthRoute;
