const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');
const analyzeEmotion = require('../utils/emotionAnalyzer'); // AI utility function

// Create a new journal entry
router.post('/', async (req, res) => {
  try {
    const { userId, content } = req.body;

    // Analyze emotion using AI
    const emotion = analyzeEmotion(content);

    // Create a journal entry
    const newJournal = new Journal({ userId, content, emotion });
    await newJournal.save();

    res.status(201).json({ message: 'Journal entry created', journal: newJournal });
  } catch (error) {
    res.status(500).json({ message: 'Error creating journal entry', error });
  }
});

// Get all journal entries for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const journals = await Journal.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journals', error });
  }
});

module.exports = router;
// Mock AI-powered emotion analysis
function analyzeEmotion(content) {
  const keywords = {
    happy: ['happy', 'joy', 'excited'],
    sad: ['sad', 'down', 'depressed'],
    angry: ['angry', 'furious', 'upset'],
    calm: ['calm', 'peaceful', 'relaxed'],
  };

  for (const [emotion, words] of Object.entries(keywords)) {
    for (const word of words) {
      if (content.toLowerCase().includes(word)) {
        return emotion;
      }
    }
  }
  return 'neutral';
}

module.exports = analyzeEmotion;
import React, { useState, useEffect } from 'react';

function Journal() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [userId, setUserId] = useState(''); // Replace with authenticated user ID

  useEffect(() => {
    // Fetch existing journal entries
    fetch(`/api/journals/${userId}`)
      .then((response) => response.json())
      .then((data) => setEntries(data));
  }, [userId]);

  const handleAddEntry = () => {
    fetch('/api/journals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, content: newEntry }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEntries([data.journal, ...entries]);
        setNewEntry('');
      });
  };

  return (
    <div>
      <h2>My Journal</h2>
      <textarea
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Write your thoughts here..."
      ></textarea>
      <button onClick={handleAddEntry}>Add Entry</button>
      <ul>
        {entries.map((entry) => (
          <li key={entry._id}>
            <p>{entry.content}</p>
            <p><strong>Emotion:</strong> {entry.emotion}</p>
            <p><em>{new Date(entry.createdAt).toLocaleString()}</em></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Journal;
