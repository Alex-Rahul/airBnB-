const Home = require("../Models/home");

// GET Add Home Page
exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

// GET Edit Home Page
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
    });
  });
};

// GET Host Homes List
exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(registeredHomes => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    });
  });
};

// POST Add Home
exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } = req.body;

  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description
  );

  home.save().then(() => {
    console.log("Home Saved successfully");
    res.redirect("/host/host-home-list");
  });
};

// POST Edit Home
exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } = req.body;

  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
    id
  );

  home.save().then(result => {
    console.log("Home updated",result);
    res.redirect("/host/host-home-list");
  });
};

// POST Delete Home
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.deleteById(homeId)
    .then(() => {
      console.log("Home deleted");
      res.redirect("/host/host-home-list");
    })
    .catch(error => {
      console.log("Error while deleting", error);
    });
};