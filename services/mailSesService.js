const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIAWMVII7VGVQ6AIROX",
  secretAccessKey: "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",
  region: "eu-central-1"
});

function sendMail(senderName, emails, title, content) {
  return new Promise(function (resolve, reject) {
    const ses = new AWS.SES({ apiVersion: "2010-12-01" });
    const params = {
      Destination: {
        ToAddresses: emails
      },
      //ConfigurationSetName: <<ConfigurationSetName>>,
      Message: {
        Body: {
          Html: {
            // HTML Format of the email
            Charset: "UTF-8",
            Data: content
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: title
        }
      },
      Source: `${senderName} <${process.env.DEFUALT_SES_MAIL}>`
    };
    const sendSesEmail = ses.sendEmail(params).promise();
    sendSesEmail
      .then(data => {
        //console.log("email submitted to SES", data);
        resolve(data)
      })
      .catch(error => {
        console.log(error);
        reject(error)
      });

  });
}

module.exports = { sendMail };