const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/users");
const coursesModel = require("../models/courses");
const serviceModel = require("../models/serviceModel");
const categoryModel = require("../models/categories");
const subCategoryModel = require("../models/subCategories");

// register user
const registerUserCtrl = asyncHandler(async (req, res) => {
  const validation = validateRegisterUser(req.body);
  if (validation.error) {
    return res
      .status(400)
      .json({ message: validation.error.details[0].message });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  });
  await user.save();
  res
    .status(201)
    .json({ message: "you registered successfully, please login" });
  // save it to db
  // send
});

// login user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const validation = validateLoginUser(req.body);
  console.log(validation);
  if (validation.error) {
    return res
      .status(400)
      .json({ message: validation.error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  const token = user.generateAuthToken();
  //   localStorage.setItem('token', token);
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    email: user.email,
    username: user.username,
    token,
    // user.freelancerDetails
    freelancerDetails: null,
  });
});

// get all users
const getAllUsersCtrl = asyncHandler(async (req, res) => {
  console.log(req.headers.authorization.split(" ")[1]);
  const users = await User.find(
    {},
    {
      _id: 1,
      username: 1,
      email: 1,
      isAccountVerified: 1,
      profilePhoto: 1,
      role: 1,
    }
  );
  //   res.status(200).json(users);
  // show nums of users and users
  res.status(200).json({ count: users.length, users });
});

//get user by id
const getUserByIdCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});
// get clients numbers and clients
const getClientsCtrl = asyncHandler(async (req, res) => {
  const clients = await User.find(
    { role: "user" },
    {
      _id: 1,
      username: 1,
      email: 1,
      isAccountVerified: 1,
      profilePhoto: 1,
      role: 1,
    }
  );
  res.status(200).json({ count: clients.length, clients });
});

// get freelancers numbers and freelancers
const getFreelancersCtrl = asyncHandler(async (req, res) => {
  const freelancers = await User.find(
    { role: "freelancer" },
    {
      _id: 1,
      username: 1,
      email: 1,
      isAccountVerified: 1,
      profilePhoto: 1,
      role: 1,
    }
  );
  res.status(200).json({ count: freelancers.length, freelancers });
});

// get admins numbers and admins
const getAdminsCtrl = asyncHandler(async (req, res) => {
  const admins = await User.find(
    { role: "admin" },
    {
      _id: 1,
      username: 1,
      email: 1,
      isAccountVerified: 1,
      profilePhoto: 1,
      role: 1,
    }
  );
  res.status(200).json({ count: admins.length, admins });
});

// get user data by token
const getUserDataByToken = asyncHandler(async (req, res) => {
  console.log(req.headers.authorization);
  console.log(req.user);
  const user = await User.findById(req.user.id);
  res.status(200).json(user);
  consle.log(user);
});

// delete user by id
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User deleted successfully" });
});

// edit user by id

const editUserById = asyncHandler(async (req, res) => {
  //   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //     runValidators: true,
  //   });
  //   if (!user) {
  //     return res.status(404).json({ message: "User not found" });
  //   }
  //   res.status(200).json(user);

  // try catch
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// module.exports = { editUserById };

// convert user to admin
const convertUserToAdmin = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: "admin" });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User converted to admin successfully" });
});

// get lenght of courses, services, categories, subcategories, users, clients, freelancers, admins
const getLengthOfData = asyncHandler(async (req, res) => {
  const courses = await coursesModel.find();
  const services = await serviceModel.find();
  const categories = await categoryModel.find();
  const subCategories = await subCategoryModel.find();
  const users = await User.find();
  const clients = await User.find({ role: "user" });
  const freelancers = await User.find({ role: "freelancer" });
  const admins = await User.find({ role: "admin" });

  res.status(200).json({
    users: users.length,
    clients: clients.length,
    freelancers: freelancers.length,
    admins: admins.length,
    categories: categories.length,
    subCategories: subCategories.length,
    services: services.length,
    courses: courses.length,
  });
});

module.exports = {
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
  editUserById,
};
