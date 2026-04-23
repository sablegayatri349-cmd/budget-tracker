const express = require("express");
const router  = express.Router();
const {
  register, login,
  getProfile, updateProfile, changePassword, deleteAccount
} = require("../controllers/authController");
const { forgotPassword, resetPassword } = require("../controllers/passwordResetController");
const protect = require("../middleware/authMiddleware");
/* ── RATE LIMITER ── */
const rateMap = new Map();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_HITS  = process.env.NODE_ENV === 'production' ? 10 : 100; // relaxed in dev

function authRateLimit(req, res, next) {
  const ip  = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const rec = rateMap.get(ip) || { count: 0, start: now };
  if (now - rec.start > WINDOW_MS) { rec.count = 0; rec.start = now; }
  rec.count++;
  rateMap.set(ip, rec);
  if (rec.count > MAX_HITS) return res.status(429).json({ success: false, message: "Too many attempts. Try again in 15 minutes." });
  next();
}



/* ── INPUT VALIDATORS ── */
function validateRegister(req, res, next) {
  const { name, email, password } = req.body;
  const errors = [];
  if (!name  || name.trim().length < 2)              errors.push("Name must be at least 2 characters");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required");
  if (!password || password.length < 8)              errors.push("Password must be at least 8 characters");
  if (password && !/(?=.*[0-9])/.test(password))     errors.push("Password must contain at least one number");
  if (errors.length) return res.status(400).json({ success: false, message: errors[0], errors });
  req.body.name  = name.trim();
  req.body.email = email.trim().toLowerCase();
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ success: false, message: "Valid email is required" });
  if (!password)
    return res.status(400).json({ success: false, message: "Password is required" });
  req.body.email = email.trim().toLowerCase();
  next();
}

/* ── ROUTES ── */
router.post("/register",         authRateLimit, validateRegister, register);
router.post("/login",            authRateLimit, validateLogin,    login);
router.get ("/profile",          protect,                         getProfile);
router.put ("/profile",          protect,                         updateProfile);
router.put ("/change-password",  protect,                         changePassword);
router.post("/forgot-password",                                    forgotPassword);
router.post("/reset-password",                                     resetPassword);
router.delete("/account",            protect,                         deleteAccount);

module.exports = router;