require('dotenv').config() 

const { MongoClient } = require('mongodb')

let connectDB = new MongoClient(process.env.URL).connect()

module.exports = connectDB 