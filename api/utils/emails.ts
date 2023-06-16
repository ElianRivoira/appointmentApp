const nodemailer = require('nodemailer');
import dotenv from 'dotenv';

dotenv.config();

interface MailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const send = (options: MailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cruceAppointmentsApp@gmail.com',
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOption = {
    ...options,
    from: "'MyWebApp' cruceAppointmentsApp@gmail.com",
  };

  transporter.sendMail(mailOption, (err: Error) => {
    if (err) {
      console.log('Error sending mail', err);
    }
  });
};

const sendPasswordChangerEmail = (data: any) => {
  const mailOptions = {
    to: data.email,
    subject: 'Password change request',
    text: 'Password change',
    html: `
    <p>To follow the password change process click in the link below</p>
    <a href='http://localhost:3000/passwordChange/${data.id}'>Change password</a>`,
  };
  send(mailOptions);
};

export { sendPasswordChangerEmail }