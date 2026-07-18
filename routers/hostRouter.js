// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const hostController = require("../controller/hostController");

// Add Home
hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.post("/add-home", hostController.postAddHome);

// Host Home List
hostRouter.get("/host-home-list", hostController.getHostHomes);

// Edit Home
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);

// Delete Home
hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome);

//EDIT Home
hostRouter.post("/edit-home", hostController.postEditHome);

module.exports = hostRouter;