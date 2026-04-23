const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  /* ── FIX 1: Check for "Bearer <token>" format, not raw header ── */
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied — no token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* ── FIX 2: Store full decoded object, not just id ── */
    /* Original: req.user = decoded.id  (loses email, iat, exp) */
    req.user = decoded; /* { id, iat, exp } — access id via req.user.id */

    next();
  } catch (err) {
    /* ── FIX 3: Handle expired vs invalid separately ── */
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired — please log in again",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid token — please log in",
    });
  }
};