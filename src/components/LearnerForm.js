import React, { useState, useEffect } from 'react';
import './LearnerForm.css'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { convertAcademicYear, calculateMonthDifference } from '../helpers/academicYear';

const LearnerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { UKPRN, academicYear, collectionPeriod, numLearners } = location.state;

  const [learners, setLearners] = useState(
    Array.from({ length: numLearners }, () => ({
      LearnRefNumber: '',
      ULN: '',
      DateOfBirth: '',
      StartDate: '',
      EndDate: '',
      StandardCode: '',
      CompletionStatus: '1',
      Outcome: '1',
      LearningDeliveryFAMCode: '1',
      TNP1: '',
      TNP2: '',
      ActualEndDate: ''
    }))
  );
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset the date values when currentIndex changes
    if (document.getElementById('dob-day')) {
      document.getElementById('dob-day').value = "";
      document.getElementById('dob-month').value = "";
      document.getElementById('dob-year').value = "";
    }

    if (document.getElementById('start-day')) {
      document.getElementById('start-day').value = "";
      document.getElementById('start-month').value = "";
      document.getElementById('start-year').value = "";
    }

    if (document.getElementById('end-day')) {
      document.getElementById('end-day').value = "";
      document.getElementById('end-month').value = "";
      document.getElementById('end-year').value = "";
    }

    if (document.getElementById('actual-end-day')) {
      document.getElementById('actual-end-day').value = "";
      document.getElementById('actual-end-month').value = "";
      document.getElementById('actual-end-year').value = "";
    }
  }, [currentIndex]);

  const handleChange = (field, value) => {
    const updatedLearners = [...learners];
    updatedLearners[currentIndex] = {
      ...updatedLearners[currentIndex],
      [field]: value
    };
    setLearners(updatedLearners);
  };

  const isFormValid = () => {
    const {
      LearnRefNumber,
      ULN,
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
  
    const errors = [];
  
    if (!LearnRefNumber) errors.push('LearnRefNumber');
    if (!/^\d{10}$/.test(ULN)) errors.push('ULN (must be 10 digits)');
    if (!DateOfBirth) errors.push('Date of Birth');
    if (!StartDate) errors.push('Start Date');
    if (!EndDate) errors.push('End Date');
    if (!StandardCode) errors.push('Standard Code');
    if (!CompletionStatus) errors.push('Completion Status');
    if (!Outcome) errors.push('Outcome');
    if (!LearningDeliveryFAMCode) errors.push('Learning Delivery FAM Code');
    if (!TNP1) errors.push('TNP1');
    if (!TNP2) errors.push('TNP2');
    if (!ActualEndDate) errors.push('Actual End Date');
  
    if (errors.length > 0) {
      alert(`Please correct the following fields: ${errors.join(', ')}`);
      return false;
    }
  
    return true;
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

  const addYearsToDate = (date, yearsToAdd) => {
    date.setFullYear(date.getFullYear() + yearsToAdd);   
    return date.toISOString().split('T')[0];
  };

  const addDaysToDate = (date, daysToAdd) => {
    let validDate = new Date(date);
    validDate.setDate(validDate.getDate() + daysToAdd)
    return validDate.toISOString().split('T')[0];
  };

  const generateXML = () => {
    let xml = `<?xml version="1.0"?>
<Message xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="ESFA/ILR/${convertAcademicYear(academicYear)}">
  <Header>
    <CollectionDetails>
      <Collection>ILR</Collection>
      <Year>${academicYear}</Year>
      <FilePreparationDate>${addYearsToDate(new Date(), 3)}</FilePreparationDate>
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
    <FamilyName>Sméth</FamilyName>
    <GivenNames>Mary Jane</GivenNames>
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
      <CompStatus>${learner.CompletionStatus}</CompStatus> `;

      if (learner.CompletionStatus == 2) {
         xml += `
      <LearnActEndDate>${learner.ActualEndDate}</LearnActEndDate>
      <Outcome>${learner.Outcome}</Outcome>
      <AchDate>${addDaysToDate(learner.ActualEndDate, 8)}</AchDate> `;
      }

      xml += ` 
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
        <LearnDelFAMDateFrom>${learner.StartDate}</LearnDelFAMDateFrom>  `;

        if (learner.CompletionStatus == 2) {
           xml += `
        <LearnDelFAMDateTo>${addDaysToDate(learner.ActualEndDate, 8)}</LearnDelFAMDateTo> `;
        }

       xml += `   
      </LearningDeliveryFAM>
      <AppFinRecord>
        <AFinType>TNP</AFinType>
        <AFinCode>1</AFinCode>
        <AFinDate>${learner.StartDate}</AFinDate>
        <AFinAmount>${learner.TNP1}</AFinAmount>
      </AppFinRecord>
      <AppFinRecord>
        <AFinType>PMR</AFinType>
        <AFinCode>1</AFinCode>
        <AFinDate>${learner.StartDate}</AFinDate>
        <AFinAmount>${Math.round(learner.TNP1 / calculateMonthDifference(learner.StartDate, learner.EndDate))}</AFinAmount>
      </AppFinRecord>
      <AppFinRecord>
        <AFinType>TNP</AFinType>
        <AFinCode>2</AFinCode>
        <AFinDate>${learner.StartDate}</AFinDate>
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
      <CompStatus>${learner.CompletionStatus}</CompStatus> `;

      if (learner.CompletionStatus ==2) {
      xml += `  
      <LearnActEndDate>${learner.ActualEndDate}</LearnActEndDate>  `;
      }

       xml += `
      <Outcome>${learner.Outcome}</Outcome>
      <SWSupAimId>d2400c387a9d5647b260ecdb80867c55</SWSupAimId>
      <LearningDeliveryFAM>
        <LearnDelFAMType>SOF</LearnDelFAMType>
        <LearnDelFAMCode>105</LearnDelFAMCode>
      </LearningDeliveryFAM>
    </LearningDelivery>
  </Learner>`;
    });

    xml += `
</Message>`;
    
    const blob = new Blob([xml], { type: 'application/xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0].replace(/-/g, ''); // Format as 'yyyyMMdd'
    const formattedTime = now.toTimeString().split(' ')[0].replace(/:/g, ''); // Format as 'HHmmss'

    link.download = `ILR-${UKPRN}-${academicYear}-${formattedDate}-${formattedTime}-${collectionPeriod}.xml`;  
    link.click();

    navigate('/');
  };

  const handleDateChange = (fieldName, day, month, year) => {
    const currentData = learners[currentIndex][fieldName] || { day: '', month: '', year: '' };
  
    const updatedDay = day || currentData.day;
    const updatedMonth = month || currentData.month;
    const updatedYear = year || currentData.year;
  
    if (updatedDay && updatedMonth && updatedYear) {
      const formattedDay = updatedDay.padStart(2, '0');
      const formattedMonth = updatedMonth.padStart(2, '0');
      const formattedDate = `${updatedYear}-${formattedMonth}-${formattedDay}`;
      handleChange(fieldName, formattedDate);
    }
  };
  

  return (
    <div className="learner-form">
      <h1>Learner {currentIndex + 1} of {numLearners}</h1>
      <form>
        <label>Learner Reference Number</label>
        <input type="text" value={learners[currentIndex].LearnRefNumber} onChange={(e) => handleChange('LearnRefNumber', e.target.value)} />

        <label>ULN</label>
        <input type="text" value={learners[currentIndex].ULN} onChange={(e) => handleChange('ULN', e.target.value)} />

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
              <option key={year + 1975} value={year + 1975}>{year + 1975}</option>
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
        <select value={learners[currentIndex].CompletionStatus} onChange={(e) => handleChange('CompletionStatus', e.target.value)}>
          <option value="1">1 - The learner is continuing or intending to continue the learning</option>
          <option value="2">2 - The learner has completed the learning</option>
          <option value="3">3 - The learner has withdrawn from the learning</option>
          <option value="6">6 - Learner has temporarily withdrawn from the aim</option>
          </select>

        <label>Outcome</label>
        <select value={learners[currentIndex].Outcome} onChange={(e) => handleChange('Outcome', e.target.value)}>
          <option value="1">1 - Achieved</option>
          <option value="2">2 - Partial achievement</option>
          <option value="3">3 - No achievement</option>
          <option value="8">8 - Learning activities are complete but the outcome is not yet known</option>
          </select>

        <label>Learning Delivery FAM Code (ACT Type) </label>
        <select value={learners[currentIndex].LearningDeliveryFAMCode} onChange={(e) => handleChange('LearningDeliveryFAMCode', e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          </select>

        <label>TNP1 Amount</label>
        <input type="text" value={learners[currentIndex].TNP1} onChange={(e) => handleChange('TNP1', e.target.value)} />

        <label>TNP2 Amount</label>
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
