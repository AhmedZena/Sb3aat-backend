const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "You have to login first" });
  }

  try {
    const decoded = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );

    // req.id = decoded.id;
    req.user = decoded; // {id , role ...}
    next();
  } catch (err) {
    res.status(401).json({ message: "You aren't authenticated." });
  }
};

const adminVerfied = async (req, res, next) => {
  // console.log(req.headers.authorization);
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "You have to login first" });
  }

  try {
    const decode = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );

    if (!decode || decode.role !== "admin") {
      return res.status(400).json({ message: "You are not admin" });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: "Permission denied." });
  }
};

const clientVerfied = async (req, res, next) => {
  // console.log(req.headers.authorization);
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "You have to login first" });
  }

  try {
    const decode = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );

    if (!decode || decode.role !== "user") {
      return res.status(400).json({ message: "You must be client" });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: "Permission denied." });
  }
};

const freelancerVerfied = async (req, res, next) => {
  // console.log(req.headers.authorization);
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "You have to login first" });
  }

  try {
    const decode = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );

    if (!decode || decode.role !== "freelancer") {
      return res.status(400).json({ message: "You must be freelancer" });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: "Permission denied." });
  }
};

// admin or freelancer verfied
const adminOrFreelancerVerfied = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "You have to login first" });
  }

  try {
    const decode = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );

    // Corrected logic: If decode.role is neither 'freelancer' nor 'admin'
    if (!decode || (decode.role !== "freelancer" && decode.role !== "admin")) {
      return res
        .status(400)
        .json({ message: "You must be admin or freelancer" });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: "Permission denied." });
  }
};

// freelancer or client verfied
const freelancerOrClientVerified = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "You have to login first" });
  }

  try {
    const decode = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );

    // Corrected logic: If decode.role is neither 'freelancer' nor 'user'
    if (!decode || (decode.role !== "freelancer" && decode.role !== "user")) {
      return res
        .status(400)
        .json({ message: "You must be freelancer or client" });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: "Permission denied." });
  }
};

// admin or client verfied
const adminOrClientVerified = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "You have to login first" });
  }

  try {
    const decode = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );

    // Corrected logic: If decode.role is neither 'freelancer' nor 'user'
    if (!decode || (decode.role !== "admin" && decode.role !== "user")) {
      return res.status(400).json({ message: "You must be admin or client" });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: "Permission denied." });
  }
};

module.exports = {
  verifyToken,
  adminVerfied,
  clientVerfied,
  freelancerVerfied,
  adminOrFreelancerVerfied,
  freelancerOrClientVerified,
  adminOrClientVerified,
};
