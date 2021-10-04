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
async function registerUser(user) {
  const [newUserObject] = await db("users").insert(user, [
    "id",
    "username",
    "password",
    "email",
    "role_id",
  ]);
  return newUserObject;
}

function loginUser(filter) {
  return db("users").where(filter).first();
}
//---------------------AUTH----------------------/
