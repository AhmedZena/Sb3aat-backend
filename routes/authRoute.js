const express = require("express");
const router = express.Router();
const {
  registerUserCtrl,
  loginUserCtrl,
  getAllUsersCtrl,
  getUserDataByToken,
  getClientsCtrl,
  getFreelancersCtrl,
  getAdminsCtrl,
  deleteUserById,
  convertUserToAdmin,
  getLengthOfData,
  getUserByIdCtrl,
} = require("../controllers/authController");
const {
  verifyToken,
  adminVerfied,
  clientVerfied,
} = require("../middlewares/auth");

router.post("/register", registerUserCtrl);
router.post("/login", loginUserCtrl);

// router.route("/Users").get(adminVerfied, getAllUsersCtrl);
router.get("/Users", getAllUsersCtrl);

router.get("/profile", verifyToken, getUserDataByToken);
router.get("/clients", verifyToken, getClientsCtrl);
router.get("/freelancers", verifyToken, getFreelancersCtrl);
router.get("/admins", verifyToken, getAdminsCtrl);
router.delete("/deleteUser/:id", verifyToken, deleteUserById);
router.patch("/convertToAdmin/:id", verifyToken, convertUserToAdmin);
router.get("/dataLength", verifyToken, getLengthOfData);
router.get("/getUserById/:id", getUserByIdCtrl); // for checking if user exists or not when updating
module.exports = router;
