import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LearnerForm.css'; 

const ProviderDetails = () => {
  const [UKPRN, setUKPRN] = useState('');
  const [academicYear, setAcademicYear] = useState('2324');
  const [collectionPeriod, setCollectionPeriod] = useState('01');
  const [numLearners, setNumLearners] = useState(1);
  const navigate = useNavigate();

  // Effect to reset state when component mounts
  useEffect(() => {
    // Resetting to initial values
    setUKPRN('');
    setAcademicYear('2425');
    setCollectionPeriod('01');
    setNumLearners(1);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (UKPRN.length === 8 && numLearners >= 1 && numLearners <= 15) {
      navigate('/learners', { state: { UKPRN, academicYear, collectionPeriod, numLearners } });
    } else {
      alert('Please ensure the UKPRN is 8 digits and the number of learners is between 1 and 15.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="learner-form">
      <h2>Enter Training Provider's Details</h2>
      <div className="learner-section">
        <label className="learner-label">
          UKPRN
          <input
            type="text"
            className="provider-input"
            value={UKPRN}
            onChange={(e) => setUKPRN(e.target.value.replace(/\D/, '').slice(0, 8))}
            required
            maxLength="8"
            pattern="\d{8}" // Ensure only numbers are entered, max 8 digits
          />
        </label>
      </div>

      <div className="learner-section">
        <label className="learner-label">
          Academic Year 
          <select
            className="learner-input"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            required
          >
            <option value="2324">2324</option>
            <option value="2425">2425</option>
            <option value="2526">2526</option>
          </select>
        </label>
      </div>

      <div className="learner-section">
        <label className="learner-label">
          Collection Period 
          <select
            className="learner-input"
            value={collectionPeriod}
            onChange={(e) => setCollectionPeriod(e.target.value)}
            required
          >
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option> 
            <option value="13">13</option>
            <option value="14">14</option>
          </select>
        </label>
      </div>

      <div className="learner-section">
        <label className="learner-label">
          Number of learners in the ILR (1-15)
          <input
            type="number"
            className="learner-input"
            value={numLearners}
            onChange={(e) => setNumLearners(Math.max(1, Math.min(15, e.target.value)))}
            min="1"
            max="15"
            required
          />
        </label>
      </div>

      <div className="buttons">
        <button type="submit" className="generate-button">Next</button>
      </div>
    </form>
  );
};

export default ProviderDetails;
