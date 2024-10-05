import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HowManyLearners = () => {
  const [numLearners, setNumLearners] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numLearners >= 1 && numLearners <= 10) {
      navigate('/learners', { state: { numLearners } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        How many learners do you want to submit ILR file for? (1-10)
        <input
          type="number"
          value={numLearners}
          onChange={(e) => setNumLearners(e.target.value)}
          min="1"
          max="10"
        />
      </label>
      <button type="submit">Next</button>
    </form>
  );
};

export default HowManyLearners;
