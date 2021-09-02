const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json({ message: "API up and running" });
});

module.exports = router;
