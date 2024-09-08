const Model = require("../auth/auth-model.js");
const bcrypt = require("bcryptjs");

// checks if the username or password is missing in registry or login
const requirements = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  } else {
    next();
  }
}

// checks if the username is already taken in the database  
const checkUsers = async (req, res, next) => {
  try {
    const [ user ] = await Model.searchBy({ username: req.body.username });
    if (user) {
      return res.status(401).json({ message: "username taken" });
    } else {
      next();
    }
  } catch(error) {
    next(error);
  }
}

//checks if the username isn't in the database OR password is incorrect
const something = async (req, res, next) => {
  next();
}

module.exports = {
  requirements,
  checkUsers
};