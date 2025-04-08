const nodemailer = require('nodemailer');
const  { SMTP_MAIL , SMTP_PASSWORD} = process.env ;

const sendMail = async (email , mailSubject , content) => {
    try {
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // For LocalHost if using cloud db then make it true
            requireTLS: true ,// For LocalHost if using cloud db then make it false
            auth: {
                user: SMTP_MAIL,
                pass: SMTP_PASSWORD,
            },

        });

        const mailOptions = {
            from: SMTP_MAIL,
            to: email,
            subject: mailSubject,
            html: content,
        };

        transport.sendMail(mailOptions , function(error , info) {
            if (error) {
                console.log('Error Occurred: ' + error.message);
            } else {
                console.log('Email Sent Successfully: ' + info.response);
            }
        });
    }

    catch (error) {
        console.log(error.message);
    }
}

module.exports = sendMail;