const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info from token to request object
    next(); // Move to the next middleware/route handler
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
