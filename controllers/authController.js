const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateRegisterUser, validateLoginUser} = require("../models/users");

const registerUserCtrl = asyncHandler(async (req, res) => {
  const validation = validateRegisterUser(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error.details[0].message });
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
    role: req.body.role
  });
  await user.save();
  res
    .status(201)
    .json({ message: "you registered successfully, please login" });
  // save it to db
  // send
});

const loginUserCtrl = asyncHandler(async (req, res) => {
    const validation = validateLoginUser(req.body);
    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
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
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    email: user.email,
    username: user.username,
    token,
    // user.freelancerDetails
    freelancerDetails:null,
  });
});

const getAllUsersCtrl = asyncHandler(async (req,res)=>{
  console.log(req.headers.authorization.split(" ")[1]);
  const users = await User.find({},{_id: 0, username:1,email:1,bio:1});
  res.status(200).json(users)
})
module.exports ={registerUserCtrl,loginUserCtrl,getAllUsersCtrl}