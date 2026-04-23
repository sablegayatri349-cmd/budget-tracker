const User    = require("../models/User");
const bcrypt  = require("bcrypt");
const jwt     = require("jsonwebtoken");

/* ── HELPERS ── */
function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function safeUser(user) {
  return {
    id:        user._id,
    name:      user.name,
    email:     user.email,
    language:  user.language || 'en',
    createdAt: user.createdAt,
  };
}

/* ────────────────────────────────────────────
   REGISTER
──────────────────────────────────────────── */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    /* Validate name format - only letters and spaces */
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please enter your full name (at least 2 characters)",
      });
    }
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name.trim())) {
      return res.status(400).json({
        success: false,
        message: "Name can only contain letters and spaces",
      });
    }
    // check dulication email
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    /* Hash password */
    const hashedPassword = await bcrypt.hash(password, 12);

    /* Create user */
    const user = await User.create({
      name:     name.trim(),
      email:    email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const token = signToken(user._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: safeUser(user),
    });

  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ success: false, message: "Server error during registration" });
  }
};

/* ────────────────────────────────────────────
   LOGIN
──────────────────────────────────────────── */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* Find user — include password field (hidden by default) */
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      /* Vague message on purpose — don't reveal if email exists */
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    /* Compare password */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = signToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      name:  user.name,
      email: user.email,
      user:  safeUser(user),
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
};

/* ────────────────────────────────────────────
   GET PROFILE  (GET /api/auth/profile)
──────────────────────────────────────────── */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user: safeUser(user) });

  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ────────────────────────────────────────────
   UPDATE PROFILE  (PUT /api/auth/profile)
   Used by profile.html — update name / email
──────────────────────────────────────────── */
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, language } = req.body;
    const updates = {};
    if (language) updates.language = language;

 if (name  && name.trim().length >= 2) {
      const namePattern = /^[A-Za-z\s]+$/;
      if (!namePattern.test(name.trim())) {
        return res.status(400).json({ success: false, message: "Name can only contain letters and spaces" });
      }
      updates.name  = name.trim();
    }
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      /* Make sure new email isn't taken by someone else */
      const conflict = await User.findOne({ email: email.toLowerCase(), _id: { $ne: req.user.id } });
      if (conflict) {
        return res.status(400).json({ success: false, message: "Email already in use by another account" });
      }
      updates.email = email.toLowerCase().trim();
    }

    if (!Object.keys(updates).length) {
      return res.status(400).json({ success: false, message: "Nothing to update" });
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.status(200).json({ success: true, message: "Profile updated", user: safeUser(user) });

  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ────────────────────────────────────────────
   CHANGE PASSWORD  (PUT /api/auth/change-password)
──────────────────────────────────────────── */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Both current and new password are required" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: "New password must be at least 8 characters" });
    }

    const user = await User.findById(req.user.id).select("+password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully" });

  } catch (error) {
    console.error("Change password error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
/* ────────────────────────────────────────────
   DELETE ACCOUNT  (DELETE /api/auth/account)
──────────────────────────────────────────── */
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    // Delete user's expenses
    const Expense  = require("../models/Expense");
    const Business = require("../models/Business");

    await Expense.deleteMany({ user: userId });
    await Business.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: "Account deleted permanently" });

  } catch (error) {
    console.error("Delete account error:", error.message);
    res.status(500).json({ success: false, message: "Server error while deleting account" });
  }
};