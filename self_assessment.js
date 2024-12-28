import React, { useState } from 'react';

function SelfAssessment() {
  const [responses, setResponses] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);

  const questions = [
    'Do you often feel anxious or stressed?',
    'Do you find it difficult to concentrate?',
    'Have you been feeling low or down recently?',
  ];

  const handleNext = () => {
    const updatedResponses = [...responses, { question: questions[currentQuestionIndex], answer: currentAnswer }];
    setResponses(updatedResponses);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
    } else {
      // Submit responses to the backend
      fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'user123', responses: updatedResponses }), // Replace with authenticated userId
      })
        .then((res) => res.json())
        .then((data) => setResult(data.assessment));
    }
  };

  return (
    <div>
      <h2>Self-Assessment</h2>
      {result ? (
        <div>
          <h3>Your Results</h3>
          <p><strong>Score:</strong> {result.score}</p>
          <p><strong>Emotional Insights:</strong> {result.emotionalInsights}</p>
        </div>
      ) : (
        <div>
          <p>{questions[currentQuestionIndex]}</p>
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Enter your response"
          />
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
}

export default SelfAssessment;
