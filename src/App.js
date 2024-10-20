import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ProviderDetails from './components/ProviderDetails';
import LearnerForm from './components/LearnerForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProviderDetails />} />
        <Route path="/learners" element={<LearnerForm />} />
      </Routes>
    </Router>
  );
};

export default App;