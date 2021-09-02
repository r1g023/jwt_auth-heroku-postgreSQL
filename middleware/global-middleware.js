const jwt = require("jsonwebtoken");

module.exports = {
  generateToken,
  restrictedUser,
};

function generateToken(user) {
  const payload = {
    subID: user.id,
    name: user.username,
    email: user.email,
    role: user.role_id,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function restrictedUser() {
  return (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.json({ message: "not authorized, please provide token" });
        } else {
          req.decodedToken = decodedToken;
          console.log(req.decodedToken);
          next();
        }
      });
    } else {
      res.json({ message: "there is no token, please enter one" });
    }
  };
}
