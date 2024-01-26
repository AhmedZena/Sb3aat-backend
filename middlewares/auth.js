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

    req.id = decoded.id;

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
      return res.status(400).json({ message: "You don't have access here" });
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

    if (!decode || decode.role !== "admin") {
      return res.status(400).json({ message: "You don't have access here" });
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

    if (!decode || decode.role !== "admin") {
      return res.status(400).json({ message: "You don't have access here" });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: "Permission denied." });
  }
};

module.exports = { 
  verifyToken, 
  adminVerfied ,
  clientVerfied,
  freelancerVerfied 
};
