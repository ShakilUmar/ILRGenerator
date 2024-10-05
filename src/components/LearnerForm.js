import React, { useState } from 'react';
import './LearnerForm.css'; 
import { useLocation, useNavigate } from 'react-router-dom';

const LearnerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { numLearners } = location.state;

  const [learners, setLearners] = useState(
    Array.from({ length: numLearners }, () => ({
      LearnRefNumber: '',
      ULN: '',
      FamilyName: '',
      GivenNames: '',
      DateOfBirth: '',
    }))
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (field, value) => {
    const updatedLearners = [...learners];
    updatedLearners[currentIndex][field] = value;
    setLearners(updatedLearners);
  };

  const isFormValid = () => {
    const { ULN, FamilyName, GivenNames, DateOfBirth } = learners[currentIndex];

    const isULNValid = /^\d{10}$/.test(ULN); // Check for 10 digit numeric ULN

    return (
      isULNValid && // Ensure ULN is valid
      FamilyName && // Ensure FamilyName is filled
      GivenNames && // Ensure GivenNames is filled
      DateOfBirth // Ensure DateOfBirth is filled
    );
  };

  const handleNext = () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields correctly: ULN (10 digits), Family Name, Given Names, and Date of Birth.');
      return; // Prevent moving to the next learner if validation fails
    }

    if (currentIndex < numLearners - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const generateXML = () => {
    let xml = `<?xml version="1.0" encoding="utf-8"?>
<Message xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:test="ESFA/ILR/2023-24">
  <Header>
    <CollectionDetails>
      <Collection>ILR</Collection>
      <Year>2324</Year>
      <FilePreparationDate>${new Date().toISOString().split('T')[0]}</FilePreparationDate>
    </CollectionDetails>
    <Source>
      <ProtectiveMarking>OFFICIAL-SENSITIVE-Personal</ProtectiveMarking>
      <UKPRN>34334</UKPRN>
      <SoftwareSupplier>Software Supplier</SoftwareSupplier>
      <SoftwarePackage>Software Package</SoftwarePackage>
      <Release>Release</Release>
      <SerialNo>1</SerialNo>
      <DateTime>${new Date().toISOString()}</DateTime>
    </Source>
  </Header>
  <LearningProvider>
    <UKPRN>34334</UKPRN>
  </LearningProvider>`;

    learners.forEach((learner) => {
      xml += `
  <Learner>
    <LearnRefNumber>${learner.LearnRefNumber}</LearnRefNumber>
    <ULN>${learner.ULN}</ULN>
    <FamilyName>${learner.FamilyName}</FamilyName>
    <GivenNames>${learner.GivenNames}</GivenNames>
    <DateOfBirth>${learner.DateOfBirth}</DateOfBirth>
    <Ethnicity>31</Ethnicity>
    <Sex>F</Sex>
    <LLDDHealthProb>2</LLDDHealthProb>
    <NINumber>LJ000000A</NINumber>
    <PostcodePrior>M9 4EU</PostcodePrior>
    <Postcode>M9 4EU</Postcode>
    <AddLine1>18 Address line road</AddLine1>
    <AddLine2>Amington</AddLine2>
    <TelNo>07855555555</TelNo>
    <Email>myemail@myemail.com</Email>
    <PriorAttain>
      <PriorLevel>2</PriorLevel>
      <DateLevelApp>2021-04-17</DateLevelApp>
    </PriorAttain>
    <LearnerEmploymentStatus>
      <EmpStat>10</EmpStat>
      <DateEmpStatApp>2019-04-17</DateEmpStatApp>
      <EmpId>915862549</EmpId>
      <EmploymentStatusMonitoring>
        <ESMType>EII</ESMType>
        <ESMCode>8</ESMCode>
      </EmploymentStatusMonitoring>
      <EmploymentStatusMonitoring>
        <ESMType>LOE</ESMType>
        <ESMCode>4</ESMCode>
      </EmploymentStatusMonitoring>
    </LearnerEmploymentStatus>
    <LearningDelivery>
      <LearnAimRef>ZPROG001</LearnAimRef>
      <AimType>1</AimType>
      <AimSeqNumber>1</AimSeqNumber>
      <LearnStartDate>2024-01-01</LearnStartDate>
      <LearnPlanEndDate>2026-01-01</LearnPlanEndDate>
      <FundModel>36</FundModel>
      <PHours>324</PHours>
      <OTJActHours>344</OTJActHours>
      <ProgType>25</ProgType>
      <StdCode>91</StdCode>
      <DelLocPostCode>WS15 3JQ</DelLocPostCode>
      <EPAOrgID>EPA0061</EPAOrgID>
      <CompStatus>2</CompStatus>
      <LearnActEndDate>2024-08-15</LearnActEndDate>
      <Outcome>1</Outcome>
      <AchDate>2024-04-25</AchDate>
      <SWSupAimId>0c29a200c9d14749a90ce04a5b202ca6</SWSupAimId>
    </LearningDelivery>
    <LearningDelivery>
      <LearnAimRef>60152680</LearnAimRef>
      <AimType>3</AimType>
      <AimSeqNumber>2</AimSeqNumber>
      <LearnStartDate>2023-08-15</LearnStartDate>
      <LearnPlanEndDate>2024-08-15</LearnPlanEndDate>
      <FundModel>36</FundModel>
      <ProgType>25</ProgType>
      <StdCode>91</StdCode>
      <DelLocPostCode>WS15 3JQ</DelLocPostCode>
      <CompStatus>2</CompStatus>
      <LearnActEndDate>2024-08-15</LearnActEndDate>
      <Outcome>1</Outcome>
      <SWSupAimId>d2400c387a9d5647b260ecdb80867c55</SWSupAimId>
    </LearningDelivery>
  </Learner>`;
    });

    xml += `
</Message>`;

    const blob = new Blob([xml], { type: 'text/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'learners.xml';
    link.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only generate XML if on the last learner
    if (currentIndex === numLearners - 1) {
      generateXML();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="learner-form">
      <h3 className="learner-header">Learner {currentIndex + 1}</h3>
      {Object.entries(learners[currentIndex]).map(([key, value]) => (
        <div key={key} className="learner-section">
          <label className="learner-label">
            {key}:
            {key === 'DateOfBirth' ? (
              <input
                type="date"
                className="learner-input"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                required={key !== 'LearnRefNumber'} // Make required if not LearnRefNumber
              />
            ) : (
              <input
                className="learner-input"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                required={key !== 'LearnRefNumber'} // Make required if not LearnRefNumber
                pattern={key === 'ULN' ? '\\d{10}' : undefined} // Set pattern for ULN
              />
            )}
          </label>
        </div>
      ))}
      <div className="button-container">
        <button type="button" onClick={handlePrevious} disabled={currentIndex === 0} className="nav-button">
          Previous
        </button>
        {currentIndex < numLearners - 1 ? (
          <button type="button" onClick={handleNext} className="nav-button">Next</button>
        ) : (
          <button type="submit" className="generate-button">Generate XML</button>
        )}
      </div>
    </form>
  );
};

export default LearnerDetails;
