const server = require("./api/server");
require("dotenv").config();

//5000
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`server is listening on port ${port}....`);
});
