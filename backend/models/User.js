const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type:      String,
      required:  [true, "Name is required"],
      trim:      true,
      minlength: [2,   "Name must be at least 2 characters"],
      maxlength: [50,  "Name cannot exceed 50 characters"],
    },

    email: {
      type:      String,
      required:  [true, "Email is required"],
      unique:    true,
      trim:      true,
      lowercase: true, /* FIX: always store email in lowercase */
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },

    /* FIX: select:false — password NEVER returned in queries by default.
       Must explicitly use .select("+password") when you need it (login).
       This prevents accidental password leaks in API responses.          */
    password: {
      type:      String,
      required:  [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select:    false,
    },

    /* Optional profile fields — useful for profile page */
   currency: {
  type:    String,
  default: "INR",
},

language: {
  type:    String,
  default: "en",
},

    isActive: {
      type:    Boolean,
      default: true,
    },

    /* ── PASSWORD RESET FIELDS ── */
    resetPasswordToken: {
      type:   String,
      select: false, /* hidden by default */
    },
    resetPasswordExpiry: {
      type:   Date,
      select: false,
    },
    googleId: {
      type:   String,
      default: null,
    },
  },
  {
    timestamps: true, /* adds createdAt + updatedAt */
  }
);

/* NOTE: email index is already created by unique:true above — no need to add it again */

/* ── VIRTUAL: first letter of name for avatar ── */
userSchema.virtual("initials").get(function () {
  return this.name.charAt(0).toUpperCase();
});

/* ── METHOD: return safe user object (no password) ── */
userSchema.methods.toSafeObject = function () {
  return {
    id:        this._id,
    name:      this.name,
    email:     this.email,
    currency:  this.currency,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model("User", userSchema);