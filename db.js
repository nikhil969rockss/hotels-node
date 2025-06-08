const mongoose = require("mongoose");

const connectToDb = async (dbURL) => {
  await mongoose.connect(dbURL);
};

module.exports = connectToDb;
