const Model = require("../auth/auth-model.js");

const checkUser = async (req, res, next) => {
    try {
        const [ user ] = await Model.searchBy({ username: req.body.username });
        if (user) {
          req.user = user;
          next();
        } else {
          next({ status: 401, message: "invalid credentials" });
        }
    } catch(error) {
        next(error);
    }
}

module.exports = {
  checkUser
};