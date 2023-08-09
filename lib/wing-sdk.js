const AWS = require('aws-sdk');
class SQS {
  async sendMessage(params) {
      return http.post(process.env["WING_QUEUE_URL_" + queueName], { body: params.messageBody } );
    }
}
exports.AWS = function (queueName) {
    if (process.env.IN_WING_SIMULATION) { 
      return { 
        config: {
          update: function () {      
          }
        }, 
        SQS: SQS
      }
      
    } else {
      return AWS;
    }
}