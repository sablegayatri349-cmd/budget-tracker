const express = require("express");
const router  = express.Router();
const {
  addExpense, getExpenses,
  updateExpense, deleteExpense, getSummary
} = require("../controllers/expenseController");
const protect = require("../middleware/authMiddleware");



/* ── INPUT VALIDATOR ── */
function validateExpense(req, res, next) {
  const { title, amount, category, date } = req.body;
  const errors = [];
  if (!title || title.trim().length < 1)          errors.push("Expense title is required");
  if (title && title.trim().length > 100)          errors.push("Title must be under 100 characters");
  if (amount === undefined || amount === null || amount === "") errors.push("Amount is required");
  if (isNaN(Number(amount)) || Number(amount) <= 0) errors.push("Amount must be a positive number");
  if (Number(amount) > 10_000_000)                 errors.push("Amount seems too large");
  const validCategories = ["Food","Transport","Housing","Health","Shopping","Entertainment","Bills","Education","Other"];
  if (category && !validCategories.includes(category)) errors.push("Invalid category");
  if (date && isNaN(new Date(date).getTime()))     errors.push("Invalid date format");
  if (errors.length) return res.status(400).json({ success: false, message: errors[0], errors });
  req.body.title    = title.trim();
  req.body.amount   = Number(amount);
  req.body.category = category || "Other";
  req.body.date     = date     || new Date().toISOString().split("T")[0];
  next();
}

function validateId(req, res, next) {
  if (!req.params.id || !/^[a-fA-F0-9]{24}$/.test(req.params.id))
    return res.status(400).json({ success: false, message: "Invalid expense ID" });
  next();
}

/* ── ROUTES ── */
router.get ("/summary",          protect,                           getSummary);
router.get ("/",                 protect,                           getExpenses);
router.post("/",                 protect, validateExpense,          addExpense);
router.post("/add",              protect, validateExpense,          addExpense);   /* legacy alias */
router.put ("/:id",              protect, validateId, validateExpense, updateExpense);
router.put ("/update/:id",       protect, validateId, validateExpense, updateExpense); /* legacy */
router.delete("/:id",            protect, validateId,               deleteExpense);
router.delete("/delete/:id",     protect, validateId,               deleteExpense); /* legacy */

module.exports = router;