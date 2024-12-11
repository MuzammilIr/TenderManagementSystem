const express = require('express');
const router = express.Router();
const Tender = require('../models/Tender');

// GET all tenders
router.get('/', async (req, res) => {
  try {
    const tenders = await Tender.find();
    res.json(tenders);
    res.status(200).json({tenders})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
