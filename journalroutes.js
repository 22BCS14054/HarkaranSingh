// File 3: routes/journalRoutes.js (Journal API Routes-routes and gamification)
const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');
const { analyzeEmotion } = require('../utils/aiUtils');

// Add a new journal entry
router.post('/', async (req, res) => {
  try {
    const { userId, content } = req.body;
    const emotionAnalysis = await analyzeEmotion(content);
    const newJournal = new Journal({
      user: userId,
      content,
      emotion: emotionAnalysis,
    });
    const savedJournal = await newJournal.save();
    res.status(201).json(savedJournal);
  } catch (err) {
    res.status(500).json({ message: 'Error saving journal entry', error: err });
  }
});
