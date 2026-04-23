require("dotenv").config();
/* ── VALIDATE ENVIRONMENT VARIABLES ── */
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.error('❌ FATAL ERROR: Missing required environment variables:');
  missingEnvVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('Please create a .env file in the backend folder with all required variables.');
  process.exit(1);
}
//Import Librariesa
const express  = require("express"); //framework to create server and handle requests
const cors     = require("cors");
const path     = require("path");
const connectDB = require("./config/db");
// google//
const session  = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt      = require("jsonwebtoken");
const User     = require("./models/User");

/* ──  Import Routes ── */
const authRoutes    = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const businessRoutes = require("./routes/businessRoutes");

const app = express();

/* ────────────────────────────────────────────
   DATABASE CONNECTION
──────────────────────────────────────────── */
connectDB();

/* ────────────────────────────────────────────
   MIDDLEWARE
──────────────────────────────────────────── */

/* CORS — allow frontend origin */
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
// Google//
app.use(session({
  secret: "budgettracker_secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
/* Parse JSON bodies */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/* Request logger (dev only) */
if (process.env.NODE_ENV !== "production") {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

/* ────────────────────────────────────────────
   SERVE FRONTEND (static files)
──────────────────────────────────────────── */
const PUBLIC_DIR = path.join(__dirname, "../public");
app.use(express.static(PUBLIC_DIR, { index: false }));

/* Landing page */
app.get("/", (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "welcome.html"));
});

/* ────────────────────────────────────────────
   API ROUTES
──────────────────────────────────────────── */
app.use("/api/auth",     authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/business", businessRoutes);
// Google//
// ── GOOGLE OAUTH ──
passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = await User.create({
        name:     profile.displayName,
        email:    profile.emails[0].value,
        password: "GOOGLE_" + Date.now(),
        googleId: profile.id,
      });
    }
    return done(null, user);
  } catch(err) { return done(err, null); }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try { done(null, await User.findById(id)); }
  catch(e) { done(e, null); }
});

app.get("/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/api/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login.html" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.redirect(`/auth-success.html?token=${token}&name=${encodeURIComponent(req.user.name)}&email=${encodeURIComponent(req.user.email)}`);
  }
);


/* Health check — useful for deployment platforms */
app.get("/api/health", (_req, res) => {
  res.json({
    status:  "ok",
    message: "BudgetTracker API is running",
    time:    new Date().toISOString(),
  });
});

/* ────────────────────────────────────────────
   404 HANDLER — unknown API routes
──────────────────────────────────────────── */
app.use("/api/*splat", (_req, res) => {
  res.status(404).json({ success: false, message: "API route not found" });
});

/* ── SPA FALLBACK — serve index.html for any other route ── */
// app.get("/*splat", (_req, res) => {
//   res.sendFile(path.join(PUBLIC_DIR, "welcome.html"));
// });
app.get("/*splat", (req, res) => {
  const filePath = path.join(PUBLIC_DIR, req.url.split('?')[0]);
  res.sendFile(filePath, (err) => {
    if (err) res.sendFile(path.join(PUBLIC_DIR, "welcome.html"));
  });
});
/* ────────────────────────────────────────────
   GLOBAL ERROR HANDLER
──────────────────────────────────────────── */
app.use((err, _req, res, _next) => {
  console.error("❌ Server error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

/* ────────────────────────────────────────────
   START SERVER
──────────────────────────────────────────── */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("─────────────────────────────────────");
  console.log(`✅  BudgetTracker server started`);
  console.log(`🌐  http://localhost:${PORT}`);
  console.log(`🗄️   MongoDB: ${process.env.MONGO_URI ? "connected" : "check .env"}`);
  console.log(`📁  Serving: ${PUBLIC_DIR}`);
  console.log(`⚙️   Mode: ${process.env.NODE_ENV || "development"}`);
  console.log("─────────────────────────────────────");
});

/* ── GRACEFUL SHUTDOWN ── */
process.on("SIGTERM", () => {
  console.log("🔴 SIGTERM received — shutting down gracefully");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled promise rejection:", err.message);
  server.close(() => process.exit(1));
});