// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const storeController = require("../controller/storeController");

// ✅ Home routes
storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);

// ✅ Booking
storeRouter.get("/bookings", storeController.getBookings);

// ✅ Favourites (PROPER STRUCTURE)

// Show favourites page
storeRouter.get("/favourites", storeController.getFavouriteList);

// Add to favourites
storeRouter.post("/favourites/add", storeController.postAddToFavourite);

// Remove from favourites
storeRouter.post("/favourites/remove/:homeId", storeController.postRemoveFromFavourite);

module.exports = storeRouter;