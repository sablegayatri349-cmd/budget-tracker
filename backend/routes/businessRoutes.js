const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const Business = require('../models/Business');

// GET all business transactions for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const txns = await Business.find({ user: req.user.id }).sort({ date: -1 });
    res.json(txns);
  } catch(e) { res.status(500).json({ message: 'Server error' }); }
});

// POST add new transaction
router.post('/', auth, async (req, res) => {
  try {
    const { type, amount, fromTo, category, note, date } = req.body;
    const txn = await Business.create({ user: req.user.id, type, amount, fromTo, category, note, date });
    res.json(txn);
  } catch(e) { res.status(500).json({ message: 'Server error' }); }
});

// DELETE transaction
router.delete('/:id', auth, async (req, res) => {
  try {
    const txn = await Business.findOne({ _id: req.params.id, user: req.user.id });
    if (!txn) return res.status(404).json({ message: 'Not found' });
    await txn.deleteOne();
    res.json({ message: 'Deleted' });
  } catch(e) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;