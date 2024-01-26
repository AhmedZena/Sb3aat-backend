const express = require("express");
const router = express.Router();
const {
  registerUserCtrl,
  loginUserCtrl,
  getAllUsersCtrl,
} = require("../controllers/authController");
const { adminVerfied, clientVerfied } = require("../middlewares/auth");

router.post("/register", registerUserCtrl);
router.post("/login", loginUserCtrl);

// router.route("/Users").get(adminVerfied, getAllUsersCtrl);
router.get("/Users", getAllUsersCtrl);
module.exports = router;
