const Favourite = require("../Models/favourites");
const Home = require("../Models/home");

// GET Index Page
exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};

// GET Homes List
exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    });
  });
};

// GET Bookings
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

// GET Favourite List
exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites()
    .then(favourites => {
      const favIds = favourites
        .map(fav => fav.houseId)
        .filter(id => id);

      return Home.fetchAll().then(homes => {
        const favouriteHomes = homes.filter(home =>
          favIds.includes(home._id.toString())
        );

        res.render("store/favourite-list", {
          favouriteHomes,
          pageTitle: "My Favourites",
          currentPage: "favourites",
        });
      });
    });
};

// ADD Favourite
exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.homeId;

  console.log("Received homeId:", homeId); // DEBUG

  if (!homeId) {
    console.log("homeId is missing");
    return res.redirect("/homes");
  }

  const fav = new Favourite(homeId);

  fav.save()
    .then(result => {
      console.log("Fav Added:", result.insertedId); // ✅ correct log
    })
    .catch(err => console.log(err))
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;

  Favourite.deleteByHomeId(homeId)
    .then(() => {
      console.log("Fav Removed");
      res.redirect("/favourites");
    })
    .catch(err => console.log(err));
};

// GET Home Details
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/homes");
    }

    res.render("store/home-detail", {
      home: home,
      pageTitle: "Home Detail",
      currentPage: "Home",
    });
  });
};