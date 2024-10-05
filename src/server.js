const express = require('express');
const bodyParser = require('body-parser');
const { generateXml } = require('./generateXml');

const app = express();
app.use(bodyParser.json());

app.post('/api/generate-xml', (req, res) => {
  const learners = req.body.learners;
  const xmlString = generateXml(learners);

  res.setHeader('Content-Type', 'application/xml');
  res.send(xmlString);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
