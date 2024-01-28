const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
// user schema
require("dotenv").config({ path: "../.config.env" });

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        publicId: null,
      },
    },
    bio: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin", "freelancer"],
      default: "user",
    },

    isAccountVerified: {
      type: Boolean,
      default: false,
    },
    skills: {
      type: [String],
    },
    experiens: {
      type: String,
    },
    ratingsAverage: {
      type: Number,
    },
    dateJoined: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET);
};

/// user model
const User = mongoose.model("User", UserSchema);

// validate user
function validateRegisterUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().trim().min(5).max(50).required().email(),
    password: Joi.string().min(8).required(),
    role: Joi.string().trim(),
  });
  return schema.validate(obj);
}

function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(50).required().email(),
    password: Joi.string().min(8).required(),
    role: Joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
};
