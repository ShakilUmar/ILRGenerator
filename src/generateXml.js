const { create } = require('xmlbuilder2');

const generateXml = (learners) => {
  const doc = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('Message', {
      xmlns: {
        xsi: "http://www.w3.org/2001/XMLSchema-instance",
        xsd: "http://www.w3.org/2001/XMLSchema",
        test: "ESFA/ILR/2023-24"
      }
    })
    .ele('Header')
      .ele('CollectionDetails')
        .ele('Collection').txt('ILR').up()
        .ele('Year').txt('2324').up()
        .ele('FilePreparationDate').txt(new Date().toISOString().split('T')[0]).up()
      .up()
      .ele('Source')
        .ele('ProtectiveMarking').txt('OFFICIAL-SENSITIVE-Personal').up()
        .ele('UKPRN').txt('34334').up()
        .ele('SoftwareSupplier').txt('Software Supplier').up()
        .ele('SoftwarePackage').txt('Software Package').up()
        .ele('Release').txt('Release').up()
        .ele('SerialNo').txt('1').up()
        .ele('DateTime').txt(new Date().toISOString()).up()
      .up()
    .up()
    .ele('LearningProvider')
      .ele('UKPRN').txt('34334')
    .up();

  learners.forEach(learner => {
    const learnerXml = {
      Learner: {
        LearnRefNumber: learner.LearnRefNumber,
        ULN: learner.ULN,
        FamilyName: learner.FamilyName,
        GivenNames: learner.GivenNames,
        DateOfBirth: learner.DateOfBirth,
        // Add more dynamic fields as necessary
      }
    };
    doc.import(learnerXml);
  });

  return doc.end({ prettyPrint: true });
};

module.exports = { generateXml };
