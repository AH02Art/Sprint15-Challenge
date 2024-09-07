require("dotenv").config();

module.exports = {
    JWT_Secret: process.env.JWT_SECRET || "shh"
}