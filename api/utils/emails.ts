const nodemailer = require('nodemailer');
import dotenv from 'dotenv';
import { AppointmentDoc } from '../models/Appointment.model';

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

const sendAppointmentProof = (reserve: AppointmentDoc) => {
  const mailOptions = {
    to: reserve.email,
    subject: 'Reserve Proof',
    text: 'Reserve Proof',
    html: `
    <h1>COMPROBANTE DE TURNO</h1>
    <h3>¡Gracias por tu reserva!</h3>
    <p>Presentate con este <a href='http://localhost:8000/proofs/${reserve.name}_proof_${reserve.id}.pdf' target='_blank'>comprobante</a> en la sucursal indicada.</p>
    `,
  };
  send(mailOptions);
};

export { sendPasswordChangerEmail, sendAppointmentProof }