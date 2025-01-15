const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwtConfig");

exports.authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.device = decoded;
    next();
  });
};
