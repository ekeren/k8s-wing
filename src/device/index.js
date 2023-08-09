const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const app = express();
const port = 3000;

// Replace these with your own AWS credentials
AWS.config.update({
  region: 'us-west-2',
  accessKeyId: 'YOUR_ACCESS_KEY_ID', //TODO get this from the production env
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',//TODO get this from the production env
});

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

// Replace this URL with your queue URL
const queueUrl = 'YOUR_SQS_QUEUE_URL';//TODO get this from the production env

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

app.post('/device', (req, res) => {
  const messageBody = JSON.stringify(req.body);

  const params = {
    QueueUrl: queueUrl,
    MessageBody: messageBody,
  };

  let data = sqs.sendMessage(params).promise()
  console.log('Successfully sent message:', data.MessageId);
  res.status(200).json({ success: 'Message sent to SQS' });
  
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});