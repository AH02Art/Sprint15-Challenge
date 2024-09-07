const db = require("../../data/dbConfig.js");

const getAll = function() {
    return db("users");
}

const getById = function(id) {
    return db("users")
        .where("id", id).first();
}

const searchBy = function(filter) {
    return db("users")
        .where(filter);
}

const add = async function(user) {
    const [ id ] = await db("users").insert(user);
    return getById(id);
}

module.exports = {
    getAll,
    getById,
    searchBy,
    add
}