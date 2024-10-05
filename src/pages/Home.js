// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ onCountChange }) => {
  const [learnerCount, setLearnerCount] = useState(1);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleNext = () => {
    onCountChange(learnerCount); // Pass the learnerCount to the parent component
    navigate('/learners'); // Navigate to the learners page
  };

  return (
    <div>
      <h1>ILR Generator</h1>
      <label>
        How many learners do you want to submit the ILR file for?
        <input
          type="number"
          value={learnerCount}
          onChange={(e) => setLearnerCount(Math.max(1, Math.min(10, e.target.value)))}
          min="1"
          max="10"
        />
      </label>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Home;
