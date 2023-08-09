const AWS = require('aws-sdk');

exports.getQueue = function (queueName) {
    if (process.env.IN_WING_SIMULATION) { 
      return { 
        push: async function (m) {
          return http.post(process.env["WING_QUEUE_URL_" + queueName])
        }
      }
      
    } else {
      AWS.config.update({
        region: 'us-west-2',
        accessKeyId: 'YOUR_ACCESS_KEY_ID',
        secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
      });
      
      const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
      
      // Replace this URL with your queue URL
      const queueUrl = 'YOUR_SQS_QUEUE_URL';
      return {
        push: async function (m) {
          const params = {
            QueueUrl: queueUrl,
            MessageBody: m,
          };
          return sqs.sendMessage(params).promise();
        }
      }
    }
}