const { where } = require('./Appointment.model');
const Appointment = require('./Appointment.model');

const postReserve = async (data) => {
  const appointment = await Appointment.create(data);
  return appointment;
};

const getAllAppointmentsFromUser = async (userId) => {
  const appointments = await Appointment.find(
    { userId },
    { __v: 0, phone: 0, userId: 0 }
  );

  return appointments;
};

const getOneAppointment = async (id) => {
  console.log(id);
  const appointment = await Appointment.findOne(
    { _id: id },
    { __v: 0, userId: 0 }
  );

  return appointment;
};

module.exports = { postReserve, getAllAppointmentsFromUser, getOneAppointment };
