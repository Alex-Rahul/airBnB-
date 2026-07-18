const { getDB } = require("../utils/database");

module.exports = class Favourite {

  constructor(houseId) {
    this.houseId = houseId;
  }

  save() {
    const db = getDB();

    return db.collection('favourites').findOne({houseId : this.houseId})
    .then(exisitingFav =>{
      if(!exisitingFav){
           return db.collection("favourites").insertOne(this);
      }
       return Promise.resolve();
    })
  }

  static getFavourites() {
    const db = getDB();
    return db.collection("favourites").find().toArray();
  }

  static deleteByHomeId(homeId) {
    const db = getDB();

    return db.collection("favourites").deleteOne({
      houseId: homeId
    });
  }
};