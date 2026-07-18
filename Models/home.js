const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;

    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDB();
    console.log("Trying to insert/update...");

    if (this._id) {
      const updateFile = {
        houseName: this.houseName,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description
      };

      return db.collection("homes").updateOne(
        { _id: new ObjectId(String(this._id)) },
        { $set: updateFile }
      );

    } else {
      return db.collection("homes").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDB();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    const db = getDB();
    return db.collection("homes")
      .findOne({ _id: new ObjectId(String(homeId)) });
  }

  static deleteById(homeId) {
    const db = getDB();
    return db.collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
};