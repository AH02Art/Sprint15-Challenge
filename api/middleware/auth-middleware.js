const Model = require("../auth/auth-model.js");

const requirements = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  } else {
    next();
  }
}

const checkUsername = (req, res, next) => {
  next();
}

module.exports = {
  requirements,
  checkUsername
};