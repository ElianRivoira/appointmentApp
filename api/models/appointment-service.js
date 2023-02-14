const { where } = require('./Appointment.model');
const Appointment = require('./Appointment.model');

const postReserve = async (data) => {
  const appointment = await Appointment.create(data);
  return appointment;
};

const getAllAppointmentsFromUser = async (userId) => {
  console.log('userId:', userId);
  const appointments = await Appointment.find(
    { userId },
    { __v: 0, phone: 0, userId: 0 }
  );

  return appointments;
};

module.exports = { postReserve, getAllAppointmentsFromUser };
