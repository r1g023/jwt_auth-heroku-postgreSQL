const faker = require("faker");
const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users").insert([
    {
      username: faker.name.findName(),
      password: bcrypt.hashSync("test1", 10),
      email: faker.internet.email(),
      role_id: 1,
    },
    {
      username: faker.name.findName(),
      password: bcrypt.hashSync("test1", 10),
      email: faker.internet.email(),
      role_id: 2,
    },
  ]);
};
