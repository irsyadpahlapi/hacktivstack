const nodemailer = require('nodemailer');
const CronJob = require('cron').CronJob;

module.exports = {
  cron (email) {
    new CronJob('00 52 * * * *', function() {
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                service:'Gmail',
                auth: {
                    user: process.env.EMAILKU, // generated ethereal user
                    pass: process.env.PASSWORD// generated ethereal password
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: process.env.EMAILKU,
                to: email, // list of receivers
                subject: 'dari babang irsyad', // Subject line
                text: 'terima kasih sudah berkunjung di website terbaik diantara yang terbaik ini', // plain text body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
    }, null, true, 'Asia/Jakarta');
  }
};
