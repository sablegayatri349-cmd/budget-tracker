const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: [true, "User is required"],
      index:    true, /* FIX: index for fast queries by user */
    },

    /* FIX: added title field — your frontend uses it */
    title: {
      type:    String,
      trim:    true,
      default: "Expense",
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    amount: {
      type:     Number,
      required: [true, "Amount is required"],
      min:      [0.01, "Amount must be greater than 0"],
      max:      [10000000, "Amount is too large"],
    },

    category: {
      type:    String,
      required:[true, "Category is required"],
      enum:    {
        values:  ["Food", "Transport", "Housing", "Health", "Shopping", "Entertainment", "Bills", "Education", "Other"],
        message: "{VALUE} is not a valid category",
      },
      default: "Other",
    },

    description: {
      type:      String,
      trim:      true,
      default:   "",
      maxlength: [300, "Description cannot exceed 300 characters"],
    },

    date: {
      type:    Date,
      default: Date.now,
      index:   true, /* FIX: index for date-based sorting/filtering */
    },

    paymentMethod: {
      type:    String,
      enum:    {
        values:  ["Cash", "UPI", "Card", "Bank Transfer", "Other"],
        message: "{VALUE} is not a valid payment method",
      },
      default: "Cash",
    },

    type: {
      type:    String,
      enum:    {
        values:  ["income", "expense"],
        message: "{VALUE} is not valid — use income or expense",
      },
      default: "expense",
    },

    recurring: {
      type:    Boolean,
      default: false,
    },
  },
  {
    timestamps: true, /* FIX: adds createdAt + updatedAt automatically */
  }
);

/* ── COMPOUND INDEX: fast queries for one user's expenses by date ── */
expenseSchema.index({ user: 1, date: -1 });

/* ── VIRTUAL: formatted date for display ── */
expenseSchema.virtual("formattedDate").get(function () {
  return this.date.toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
});

module.exports = mongoose.model("Expense", expenseSchema);