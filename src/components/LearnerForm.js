import React, { useState } from 'react';
import './LearnerForm.css'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { calculateMonthDifference } from '../helpers/academicYear';


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
      StartDate: '',
      EndDate: '',
      StandardCode: '',
      CompletionStatus: '',
      Outcome: '',
      LearningDeliveryFAMCode: '',
      TNP1: '',
      TNP2: '',
      ActualEndDate: ''
    }))
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (field, value) => {
    const updatedLearners = [...learners];

    // If the field is a date, convert the value to a Date object
    if (['DateOfBirth', 'StartDate', 'EndDate', 'ActualEndDate'].includes(field)) {
        updatedLearners[currentIndex][field] = new Date(value);
    } else {
        updatedLearners[currentIndex][field] = value;
    }
    setLearners(updatedLearners);
};

const isFormValid = () => {
  const {
    ULN,
    FamilyName,
    GivenNames,
    DateOfBirth,
    StartDate,
    EndDate,
    StandardCode,
    CompletionStatus,
    Outcome,
    LearningDeliveryFAMCode,
    TNP1,
    TNP2,
    ActualEndDate
  } = learners[currentIndex];

  const isULNValid = /^\d{10}$/.test(ULN); // Check for 10 digit numeric ULN

  return (
    isULNValid && // Ensure ULN is valid
    FamilyName && 
    GivenNames && 
    DateOfBirth &&
    StartDate &&
    EndDate &&
    StandardCode &&
    CompletionStatus &&
    Outcome &&
    LearningDeliveryFAMCode &&
    TNP1 &&
    TNP2 &&
    ActualEndDate
  );
};


  const handleNext = () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields correctly');
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
    <DateOfBirth>${learner.DateOfBirth ? learner.DateOfBirth.toISOString().split('T')[0] : ''}</DateOfBirth>
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
      <LearnStartDate>${learner.StartDate.toISOString().split('T')[0]}</LearnStartDate>
      <LearnPlanEndDate>${learner.EndDate.toISOString().split('T')[0]}</LearnPlanEndDate>
      <FundModel>36</FundModel>
      <PHours>324</PHours>
      <OTJActHours>344</OTJActHours>
      <ProgType>25</ProgType>
      <StdCode>${learner.StandardCode}</StdCode>
      <DelLocPostCode>WS15 3JQ</DelLocPostCode>
      <EPAOrgID>EPA0061</EPAOrgID>
      <CompStatus>${learner.CompletionStatus}</CompStatus>
      <LearnActEndDate>2024-08-15</LearnActEndDate>
      <Outcome>${learner.Outcome}</Outcome>
      <AchDate>${learner.EndDate.toISOString().split('T')[0]}</AchDate>
      <SWSupAimId>0c29a200c9d14749a90ce04a5b202ca6</SWSupAimId>
       <LearningDeliveryFAM>
        <LearnDelFAMType>SOF</LearnDelFAMType>
        <LearnDelFAMCode>105</LearnDelFAMCode>
      </LearningDeliveryFAM>
      <LearningDeliveryFAM>
        <LearnDelFAMType>RES</LearnDelFAMType>
        <LearnDelFAMCode>1</LearnDelFAMCode>
      </LearningDeliveryFAM>
      <LearningDeliveryFAM>
        <LearnDelFAMType>ACT</LearnDelFAMType>
        <LearnDelFAMCode>${learner.LearningDeliveryFAMCode}</LearnDelFAMCode>
        <LearnDelFAMDateFrom>${learner.StartDate.toISOString().split('T')[0]}</LearnDelFAMDateFrom>
        <LearnDelFAMDateTo>${learner.EndDate.toISOString().split('T')[0]}</LearnDelFAMDateTo>
      </LearningDeliveryFAM>
      <AppFinRecord>
        <AFinType>TNP</AFinType>
        <AFinCode>1</AFinCode>
        <AFinDate>2023-08-15</AFinDate>
        <AFinAmount>${learner.TNP1}</AFinAmount>
      </AppFinRecord>
      <AppFinRecord>
        <AFinType>PMR</AFinType>
        <AFinCode>1</AFinCode>
        <AFinDate>2023-08-15</AFinDate>
        <AFinAmount>${learner.TNP1/calculateMonthDifference(learner.StartDate, learner.EndDate)}</AFinAmount>
      </AppFinRecord>
      <AppFinRecord>
        <AFinType>TNP</AFinType>
        <AFinCode>2</AFinCode>
        <AFinDate>2023-08-15</AFinDate>
        <AFinAmount>${learner.TNP2}</AFinAmount>
      </AppFinRecord>
    </LearningDelivery>
    <LearningDelivery>
      <LearnAimRef>60152680</LearnAimRef>
      <AimType>3</AimType>
      <AimSeqNumber>2</AimSeqNumber>
      <LearnStartDate>${learner.StartDate.toISOString().split('T')[0]}</LearnStartDate>
      <LearnPlanEndDate>${learner.EndDate.toISOString().split('T')[0]}</LearnPlanEndDate>
      <FundModel>36</FundModel>
      <ProgType>25</ProgType>
      <StdCode>${learner.StandardCode}</StdCode>
      <DelLocPostCode>WS15 3JQ</DelLocPostCode>
      <CompStatus>${learner.CompletionStatus}</CompStatus>
      <LearnActEndDate>${learner.ActualEndDate.toISOString().split('T')[0]}</LearnActEndDate>
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
            {key === 'DateOfBirth' || key === 'StartDate' || key === 'EndDate' || key === 'ActualEndDate' ? (
              <input
                type="date"
                className="learner-input"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                required={key !== 'LearnRefNumber'} // Required unless it's LearnRefNumber
              />
            ) : key === 'ULN' ? (
              <input
                className="learner-input"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                required
                pattern="\\d{10}" // ULN must be 10 digits
              />
            ) : key === 'TNP1' || key === 'TNP2' ? (
              <input
                type="number"
                className="learner-input"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                required
              />
            ) : (
              <input
                className="learner-input"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                required={key !== 'LearnRefNumber'} // Required unless it's LearnRefNumber
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
