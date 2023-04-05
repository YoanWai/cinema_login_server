const express = require("express");

const userController = require("./controllers/userController");

const routes = new express.Router();

routes.post("/authenticate", userController.authenticate);

module.exports = routes;
