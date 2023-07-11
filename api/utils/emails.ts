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

const sendPasswordChangerEmail = (email: string, link: string) => {
  const mailOptions = {
    to: email,
    subject: 'Password change request',
    text: 'Password change',
    html: `
    <h3>Usted a solicitado un cambio de contraseña</h3>
    <p>Para continuar con el proceso haga click en el siguiente link</p>
    <a href='${link}'>Change password</a>`,
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
    <p>Presentate con este <a href='${process.env.NEXT_PUBLIC_DOWNLOAD}/proofs/${reserve.name}_proof_${reserve.id}.pdf' target='_blank'>comprobante</a> en la sucursal indicada.</p>
    `,
  };
  send(mailOptions);
};

export { sendPasswordChangerEmail, sendAppointmentProof }