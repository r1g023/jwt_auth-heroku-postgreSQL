const db = require("../database/dbConfig");

module.exports = {
  get,
  getById,
  registerUser,
  loginUser,
};

function get() {
  return db("users")
    .join("roles", "roles.id", "users.role_id")
    .select("users.id", "users.username", "users.email", "roles.role")
    .orderBy("users.id");
}

function getById(id) {
  return db("users").where({ id }).first();
}

//---------------------AUTH----------------------/
function registerUser(data) {
  return db("users").insert(data);
}

function loginUser(filter) {
  return db("users").where(filter).first();
}
//---------------------AUTH----------------------/
