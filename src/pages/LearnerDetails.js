// src/pages/LearnerDetails.js
import React, { useState } from 'react';

const LearnerDetails = ({ learnerCount }) => {
  const [currentLearner, setCurrentLearner] = useState(0);
  const [learners, setLearners] = useState(
    Array.from({ length: learnerCount }, () => ({
      givenName: '',
      familyNames: '',
      dateOfBirth: '',
      uLN: '',
      startDate: '',
      endDate: '',
    }))
  );

  const handleChange = (e) => {
    const updatedLearners = [...learners];
    updatedLearners[currentLearner][e.target.name] = e.target.value;
    setLearners(updatedLearners);
  };

  const handleNext = () => {
    if (currentLearner < learnerCount - 1) {
      setCurrentLearner(currentLearner + 1);
    } else {
      generateXML();
    }
  };

  const generateXML = () => {
    const xml = `
    <?xml version="1.0" encoding="utf-8"?>
    <Message xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:test="ESFA/ILR/2024-25">
      <Header>
        <CollectionDetails>
          <Collection>ILR</Collection>
          <Year>2425</Year>
          <FilePreparationDate>${new Date().toISOString().split('T')[0]}</FilePreparationDate>
        </CollectionDetails>
        <Source>
          <ProtectiveMarking>OFFICIAL-SENSITIVE-Personal</ProtectiveMarking>
          <UKPRN>10037344</UKPRN>
          <SoftwareSupplier>Software Supplier</SoftwareSupplier>
          <SoftwarePackage>Software Package</SoftwarePackage>
          <Release>Release</Release>
          <SerialNo>1</SerialNo>
          <DateTime>${new Date().toISOString()}</DateTime>
        </Source>
      </Header>
      <LearningProvider>
        <UKPRN>10037344</UKPRN>
      </LearningProvider>
      ${learners.map((learner) => `
        <Learner>
          <LearnRefNumber>${learner.uln}</LearnRefNumber>
          <ULN>${learner.uln}</ULN>
          <FamilyName>${learner.familyNames}</FamilyName>
          <GivenNames>${learner.givenName}</GivenNames>
          <DateOfBirth>${learner.dateOfBirth}</DateOfBirth>
          <StartDate>${learner.startDate}</StartDate>
          <EndDate>${learner.endDate}</EndDate>
        </Learner>
      `).join('')}
    </Message>
    `;

    const blob = new Blob([xml], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'learners.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Learner Details {currentLearner + 1} of {learnerCount}</h1>
      <input
        type="text"
        name="firstName"
        value={learners[currentLearner].firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={learners[currentLearner].lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="date"
        name="dateOfBirth"
        value={learners[currentLearner].dateOfBirth}
        onChange={handleChange}
        placeholder="Date of Birth"
      />
      <input
        type="text"
        name="uln"
        value={learners[currentLearner].uln}
        onChange={handleChange}
        placeholder="ULN"
      />
      <input
        type="date"
        name="startDate"
        value={learners[currentLearner].startDate}
        onChange={handleChange}
        placeholder="Start Date"
      />
      <input
        type="date"
        name="endDate"
        value={learners[currentLearner].endDate}
        onChange={handleChange}
        placeholder="End Date"
      />
      <button onClick={handleNext}>{currentLearner < learnerCount - 1 ? 'Next' : 'Generate'}</button>
    </div>
  );
};

export default LearnerDetails;
