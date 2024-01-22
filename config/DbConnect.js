let mongoose = require("mongoose");
require("dotenv").config({ path: "../.config.env" });

function DbConnect() {
  mongoose
    .connect(process.env.DB_URL)
    .then((con) =>
      console.log(`Connected to database... ${con.connections[0].name}`)
    )
    .catch((err) => console.log(err));
}

module.exports = DbConnect;
