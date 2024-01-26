const dbConnection = () => {
  const mongoose = require("mongoose");
  mongoose
    .connect(process.env.DB_URL)
    .then((conne) => {
      console.log("connected to the database");
    })
    .catch((e) => {
      console.log("error in connection", e);
    });
};

module.exports = dbConnection;
