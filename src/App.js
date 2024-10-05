import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectLearners from './components/SelectLearners';
import LearnerForm from './components/LearnerForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectLearners />} />
        <Route path="/learners" element={<LearnerForm />} />
      </Routes>
    </Router>
  );
};

export default App;