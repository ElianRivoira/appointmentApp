const nodemailer = require('nodemailer');

const send = (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cruceAppointmentsApp@gmail.com',
      pass: 'wkuuuxuzkrcuyfun',
    },
  });

  const mailOption = {
    ...options,
    from: "'MyWebApp' cruceAppointmentsApp@gmail.com",
  };

  transporter.sendMail(mailOption, (err) => {
    if (err) {
      console.log('Error sending mail', err);
    }
  });
};

const sendPasswordChangerEmail = (data) => {
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

module.exports = { sendPasswordChangerEmail }