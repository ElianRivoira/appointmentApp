const Appointment = require('./Appointment.model');

const postReserve = async data => {
  const appointment = await Appointment.create(data);
  return appointment;
};

module.exports = { postReserve };
