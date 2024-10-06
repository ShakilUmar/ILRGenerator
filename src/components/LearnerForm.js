import React, { useState } from 'react';
import './LearnerForm.css'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { convertAcademicYear, calculateMonthDifference } from '../helpers/academicYear';

const LearnerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { UKPRN, academicYear, numLearners } = location.state;

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
    updatedLearners[currentIndex][field] = value;
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
<Message xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:test="ESFA/ILR/${convertAcademicYear(academicYear)}">
  <Header>
    <CollectionDetails>
      <Collection>ILR</Collection>
      <Year>${academicYear}</Year>
      <FilePreparationDate>${new Date().toISOString().split('T')[0]}</FilePreparationDate>
    </CollectionDetails>
    <Source>
      <ProtectiveMarking>OFFICIAL-SENSITIVE-Personal</ProtectiveMarking>
      <UKPRN>${UKPRN}</UKPRN>
      <SoftwareSupplier>Software Supplier</SoftwareSupplier>
      <SoftwarePackage>Software Package</SoftwarePackage>
      <Release>Release</Release>
      <SerialNo>1</SerialNo>
      <DateTime>${new Date().toISOString()}</DateTime>
    </Source>
  </Header>
  <LearningProvider>
    <UKPRN>${UKPRN}</UKPRN>
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
      <LearnStartDate>${learner.StartDate}</LearnStartDate>
      <LearnPlanEndDate>${learner.EndDate}</LearnPlanEndDate>
      <FundModel>36</FundModel>
      <PHours>324</PHours>
      <OTJActHours>344</OTJActHours>
      <ProgType>25</ProgType>
      <StdCode>${learner.StandardCode}</StdCode>
      <DelLocPostCode>WS15 3JQ</DelLocPostCode>
      <EPAOrgID>EPA0061</EPAOrgID>
      <CompStatus>${learner.CompletionStatus}</CompStatus>
      <LearnActEndDate>${learner.ActualEndDate}</LearnActEndDate>
      <Outcome>1</Outcome>
      <AchDate>${learner.EndDate}</AchDate>
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
        <LearnDelFAMDateFrom>${learner.StartDate}</LearnDelFAMDateFrom>
        <LearnDelFAMDateTo>${learner.EndDate}</LearnDelFAMDateTo>
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
        <AFinAmount>${learner.TNP1 / calculateMonthDifference(learner.StartDate, learner.EndDate)}</AFinAmount>
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
      <LearnStartDate>${learner.StartDate}</LearnStartDate>
      <LearnPlanEndDate>${learner.EndDate}</LearnPlanEndDate>
      <FundModel>36</FundModel>
      <ProgType>25</ProgType>
      <StdCode>${learner.StandardCode}</StdCode>
      <DelLocPostCode>WS15 3JQ</DelLocPostCode>
      <CompStatus>${learner.CompletionStatus}</CompStatus>
      <Outcome>1</Outcome>
      <AchDate>${learner.EndDate}</AchDate>
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
        <LearnDelFAMDateFrom>${learner.StartDate}</LearnDelFAMDateFrom>
        <LearnDelFAMDateTo>${learner.EndDate}</LearnDelFAMDateTo>
      </LearningDeliveryFAM>
    </LearningDelivery>
  </Learner>`;
    });

    xml += `
</Message>`;
    
    // Trigger XML download
    const blob = new Blob([xml], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'learner_data.xml';
    link.click();
  };

  const handleDateChange = (field, day, month, year) => {
    const date = `${year}-${month}-${day}`;
    handleChange(field, date);
  };

  return (
    <div className="learner-form">
      <h1>Learner {currentIndex + 1} of {numLearners}</h1>
      <form>
        <label>ULN</label>
        <input type="text" value={learners[currentIndex].ULN} onChange={(e) => handleChange('ULN', e.target.value)} />

        <label>Family Name</label>
        <input type="text" value={learners[currentIndex].FamilyName} onChange={(e) => handleChange('FamilyName', e.target.value)} />

        <label>Given Names</label>
        <input type="text" value={learners[currentIndex].GivenNames} onChange={(e) => handleChange('GivenNames', e.target.value)} />

        <label>Date of Birth</label>
        <div className='date-dropdowns'>
          <select onChange={(e) => handleDateChange('DateOfBirth', e.target.value, document.getElementById('dob-month').value, document.getElementById('dob-year').value)} id="dob-day">
            <option value="">Day</option>
            {[...Array(31).keys()].map(day => (
              <option key={day + 1} value={day + 1}>{day + 1}</option>
            ))}
          </select>
          <select id="dob-month" onChange={(e) => handleDateChange('DateOfBirth', document.getElementById('dob-day').value, e.target.value, document.getElementById('dob-year').value)}>
            <option value="">Month</option>
            {[...Array(12).keys()].map(month => (
              <option key={month + 1} value={month + 1}>{month + 1}</option>
            ))}
          </select>
          <select id="dob-year" onChange={(e) => handleDateChange('DateOfBirth', document.getElementById('dob-day').value, document.getElementById('dob-month').value, e.target.value)}>
            <option value="">Year</option>
            {[...Array(51).keys()].map(year => (
              <option key={year + 1975} value={year + 1950}>{year + 1950}</option>
            ))}
          </select>
        </div>
        <br></br>

        <label>Start Date</label>
        <div className="date-dropdowns">
          <select onChange={(e) => handleDateChange('StartDate', e.target.value, document.getElementById('start-month').value, document.getElementById('start-year').value)} id="start-day">
            <option value="">Day</option>
            {[...Array(31).keys()].map(day => (
              <option key={day + 1} value={day + 1}>{day + 1}</option>
            ))}
          </select>
          <select id="start-month" onChange={(e) => handleDateChange('StartDate', document.getElementById('start-day').value, e.target.value, document.getElementById('start-year').value)}>
            <option value="">Month</option>
            {[...Array(12).keys()].map(month => (
              <option key={month + 1} value={month + 1}>{month + 1}</option>
            ))}
          </select>
          <select id="start-year" onChange={(e) => handleDateChange('StartDate', document.getElementById('start-day').value, document.getElementById('start-month').value, e.target.value)}>
            <option value="">Year</option>
            {[...Array(21).keys()].map(year => (
              <option key={year + 2020} value={year + 2020}>{year + 2020}</option>
            ))}
          </select>
        </div>
        <br></br>

        <label>End Date</label>
        <div className="date-dropdowns">
          <select onChange={(e) => handleDateChange('EndDate', e.target.value, document.getElementById('end-month').value, document.getElementById('end-year').value)} id="end-day">
            <option value="">Day</option>
            {[...Array(31).keys()].map(day => (
              <option key={day + 1} value={day + 1}>{day + 1}</option>
            ))}
          </select>
          <select id="end-month" onChange={(e) => handleDateChange('EndDate', document.getElementById('end-day').value, e.target.value, document.getElementById('end-year').value)}>
            <option value="">Month</option>
            {[...Array(12).keys()].map(month => (
              <option key={month + 1} value={month + 1}>{month + 1}</option>
            ))}
          </select>
          <select id="end-year" onChange={(e) => handleDateChange('EndDate', document.getElementById('end-day').value, document.getElementById('end-month').value, e.target.value)}>
            <option value="">Year</option>
            {[...Array(21).keys()].map(year => (
              <option key={year + 2020} value={year + 2020}>{year + 2020}</option>
            ))}
          </select>
        </div>
        <br></br>

        <label>Standard Code</label>
        <input type="text" value={learners[currentIndex].StandardCode} onChange={(e) => handleChange('StandardCode', e.target.value)} />

        <label>Completion Status</label>
        <input type="text" value={learners[currentIndex].CompletionStatus} onChange={(e) => handleChange('CompletionStatus', e.target.value)} />

        <label>Outcome</label>
        <input type="text" value={learners[currentIndex].Outcome} onChange={(e) => handleChange('Outcome', e.target.value)} />

        <label>Learning Delivery FAM Code</label>
        <input type="text" value={learners[currentIndex].LearningDeliveryFAMCode} onChange={(e) => handleChange('LearningDeliveryFAMCode', e.target.value)} />

        <label>TNP1</label>
        <input type="text" value={learners[currentIndex].TNP1} onChange={(e) => handleChange('TNP1', e.target.value)} />

        <label>TNP2</label>
        <input type="text" value={learners[currentIndex].TNP2} onChange={(e) => handleChange('TNP2', e.target.value)} />

        <label>Actual End Date</label>
        <div className="date-dropdowns">
          <select onChange={(e) => handleDateChange('ActualEndDate', e.target.value, document.getElementById('actual-end-month').value, document.getElementById('actual-end-year').value)} id="actual-end-day">
            <option value="">Day</option>
            {[...Array(31).keys()].map(day => (
              <option key={day + 1} value={day + 1}>{day + 1}</option>
            ))}
          </select>
          <select id="actual-end-month" onChange={(e) => handleDateChange('ActualEndDate', document.getElementById('actual-end-day').value, e.target.value, document.getElementById('actual-end-year').value)}>
            <option value="">Month</option>
            {[...Array(12).keys()].map(month => (
              <option key={month + 1} value={month + 1}>{month + 1}</option>
            ))}
          </select>
          <select id="actual-end-year" onChange={(e) => handleDateChange('ActualEndDate', document.getElementById('actual-end-day').value, document.getElementById('actual-end-month').value, e.target.value)}>
            <option value="">Year</option>
            {[...Array(21).keys()].map(year => (
              <option key={year + 2020} value={year + 2020}>{year + 2020}</option>
            ))}
          </select>
        </div>
        <br></br>

        <button type="button" onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
        <button type="button" onClick={handleNext} disabled={currentIndex >= numLearners - 1}>Next</button>
        {currentIndex === numLearners - 1 && (
          <button type="button" onClick={generateXML}>Generate XML</button>
        )}
      </form>
    </div>
  );
};

export default LearnerDetails;
