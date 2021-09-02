const router = require("express").Router();
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");

router.post("/register", (req, res, next) => {
  const credentials = req.body;
  const hashedPassword = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hashedPassword;
  Users.registerUser(credentials)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => next(err));
});

module.exports = router;
