const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('wing-sdk');
const app = express();
const port = 3000;

let sqs = wingSdk.getQueue("device messages queue");


// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

app.post('/device', (req, res) => {
  const messageBody = JSON.stringify(req.body);

  let data = sqs.push(messageBody);
  console.log('Successfully sent message:', data.MessageId);
  res.status(200).json({ success: 'Message sent to SQS' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
