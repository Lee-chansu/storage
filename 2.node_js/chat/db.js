require("dotenv").config();
const { MongoClient } = require("mongodb");
url = process.env.URL;

let connectDB = new MongoClient(url).connect();

module.exports = connectDB;
