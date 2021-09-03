const router = require("express").Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  const requestOptions = {
    headers: { accept: "application/json" },
  };

  axios
    .get("https://saint-seiya-api.herokuapp.com/api/characters", requestOptions)
    .then((response) => {
      let result = [];
      let i = 0;
      for (i; i < response.data.length; i++) {
        if (i <= 0) {
          result.push(response.data[i]);
        }
      }
      res.json(result);
    })
    .catch((err) => next(err));
});

module.exports = router;
