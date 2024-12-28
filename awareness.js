// File 5: client/src/pages/Recommendations.js (Personalized Recommendations)
import React, { useState, useEffect } from 'react';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch recommendations from the backend
    fetch('/api/recommendations')
      .then((res) => res.json())
      .then((result) => setRecommendations(result));
  }, []);

  return (
    <div>
      <h2>Personalized Recommendations</h2>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;

// File 6: client/src/pages/Home.js (Mental Health Awareness)
import React from 'react';

function Home() {
  return (
    <div>
      <h1>Welcome to Mental Health Tracker</h1>
      <p>Your journey to better mental health starts here.</p>
      <h2>Resources</h2>
      <ul>
        <li><a href="https://www.nimh.nih.gov">National Institute of Mental Health</a></li>
        <li><a href="https://www.who.int/health-topics/mental-health">World Health Organization</a></li>
        <li><a href="https://www.mind.org.uk">Mind - Mental Health Support</a></li>
      </ul>
    </div>
  );
}

export default Home;
