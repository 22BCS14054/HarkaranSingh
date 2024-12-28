const express = require('express');
const router = express.Router();

// Mock data for professionals
const professionals = [
  { id: 1, name: 'Dr. Alice Smith', specialization: 'Clinical Psychologist', email: 'alice@example.com' },
  { id: 2, name: 'Dr. John Doe', specialization: 'Therapist', email: 'john@example.com' },
];

// Get a list of mental health professionals
router.get('/', (req, res) => {
  res.status(200).json(professionals);
});

// Connect with a professional via email (mock endpoint)
router.post('/connect', (req, res) => {
  const { userEmail, professionalId } = req.body;

  // Find professional by ID
  const professional = professionals.find((prof) => prof.id === professionalId);

  if (!professional) {
    return res.status(404).json({ message: 'Professional not found' });
  }

  // Simulate an email being sent
  res.status(200).json({
    message: `Email sent to ${professional.name} (${professional.email}) from ${userEmail}.`,
  });
});

module.exports = router;
