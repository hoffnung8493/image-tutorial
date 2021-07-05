const mongoose = require("mongoose");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const { sessionid } = req.headers;
  if (!sessionid || !mongoose.isValidObjectId(sessionid)) return next();
  const user = await User.findOne({ "sessions._id": sessionid });
  if (!user) return next();
  req.user = user;
  return next();
};

module.exports = { authenticate };
