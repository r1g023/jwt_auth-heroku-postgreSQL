const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to our API",
    posts: [
      {
        id: 1,
        title: "First Post",
        contents: "This is the first post",
      },
    ],
  });
});

module.exports = router;
