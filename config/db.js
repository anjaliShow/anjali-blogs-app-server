const mongoose = require("mongoose");

const connectDb = () => {
  mongoose.connect(process.env.DB).then((res) => {
    console.log(`Database connection established ${res.connection.host}`);
  });
};

module.exports = connectDb;
