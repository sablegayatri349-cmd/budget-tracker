const Expense = require("../models/Expense");

/* ────────────────────────────────────────────
   ADD EXPENSE   POST /api/expenses
──────────────────────────────────────────── */
exports.addExpense = async (req, res) => {
  try {
    /* SECURITY FIX: get user id from JWT token (req.user),
       NOT from req.body — anyone could fake that              */
    const { title, amount, category, date, description, paymentMethod, type, recurring } = req.body;

    const expense = await Expense.create({
      user:          req.user.id,          /* ← from JWT middleware, not body */
      title:         title         || "Expense",
      amount:        Number(amount),
      category:      category      || "Other",
      date:          date          || new Date(),
      description:   description   || "",
      paymentMethod: paymentMethod || "Cash",
      type:          type          || "expense",
      recurring:     recurring     || false,
    });

    res.status(201).json({
      success: true,
      message: "Expense added",
      expense,
    });

  } catch (error) {
    console.error("Add expense error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ────────────────────────────────────────────
   GET ALL EXPENSES   GET /api/expenses
──────────────────────────────────────────── */
exports.getExpenses = async (req, res) => {
  try {
    // We added { user: req.user.id } to filter by the logged-in user
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, count: expenses.length, expenses });

  } 
  catch (error) {
    console.error("Get expenses error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ────────────────────────────────────────────
   UPDATE EXPENSE   PUT /api/expenses/:id
──────────────────────────────────────────── */
exports.updateExpense = async (req, res) => {
  try {
    /* Find the expense first so we can check ownership */
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    /* SECURITY FIX: make sure this expense belongs to the logged-in user */
    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorised to edit this expense" });
    }

    /* Only allow safe fields to be updated — never allow user field to change */
    const { title, amount, category, date, description, paymentMethod, type, recurring } = req.body;
    const updates = {};
    if (title         !== undefined) updates.title         = title;
    if (amount        !== undefined) updates.amount        = Number(amount);
    if (category      !== undefined) updates.category      = category;
    if (date          !== undefined) updates.date          = date;
    if (description   !== undefined) updates.description   = description;
    if (paymentMethod !== undefined) updates.paymentMethod = paymentMethod;
    if (type          !== undefined) updates.type          = type;
    if (recurring     !== undefined) updates.recurring     = recurring;

    const updated = await Expense.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: "Expense updated",
      expense: updated,
    });

  } catch (error) {
    console.error("Update expense error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ────────────────────────────────────────────
   DELETE EXPENSE   DELETE /api/expenses/:id
──────────────────────────────────────────── */
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    /* SECURITY FIX: verify ownership before deleting */
    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorised to delete this expense" });
    }

    await expense.deleteOne();

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      id:      req.params.id,
    });

  } catch (error) {
    console.error("Delete expense error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ────────────────────────────────────────────
   GET EXPENSE SUMMARY   GET /api/expenses/summary
   Useful for dashboard stats
──────────────────────────────────────────── */
exports.getSummary = async (req, res) => {
  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);

    // We added { user: req.user.id } to both queries
    const [all, monthly] = await Promise.all([
      Expense.find({ user: req.user.id }).lean(),
      Expense.find({ user: req.user.id, date: { $gte: start } }).lean(),
    ]);

    const total        = all.reduce((s, e) => s + e.amount, 0);
    const monthlyTotal = monthly.reduce((s, e) => s + e.amount, 0);

    /* Category breakdown */
    const byCategory = {};
    all.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + e.amount; });

    res.status(200).json({
      success: true,
      summary: {
        total,
        monthlyTotal,
        count:         all.length,
        monthlyCount:  monthly.length,
        byCategory,
      },
    });

  } catch (error) {
    console.error("Summary error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};