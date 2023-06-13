const router = require("express").Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  const requestOptions = {
    headers: { accept: "application/json" },
  };
  //
  // use dummy data for now
  const dummyData = [
    {
      id: 1,
      name: "Pegasus",
      constellation: "Pegasus",
    },
    {
      id: 2,
      name: "Dragon",
      constellation: "Dragon",
    },
  ];
  res.status(200).json(dummyData);
});

module.exports = router;
