const mongo = require('mongodb');

let _db;

const mongoUrl = "mongodb+srv://Alex:root@helloworld.90ajq5p.mongodb.net/airbnb?retryWrites=true&w=majority";



const mongoConnect = (callback) => {
  const client = new mongo.MongoClient(mongoUrl);

  client.connect()
    .then(() => {
      console.log("Connected to MongoDB");
      _db = client.db(); // ✅ STORE DB
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDB = () => {
  if (!_db) {
    throw "No database found!";
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;