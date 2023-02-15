const Appointment = require('./Appointment.model');

const postReserve = async data => {
  const ap = await Appointment.findOne();
  if (ap) {
    let aux = ap.id.split('-');
    aux[0] = Number(aux[0]) + 1;
    const id = aux.join('-');
    const appointment = await Appointment.create({ ...data, id: id });
    return appointment;
  }
};

const getAllAppointmentsFromUser = async userId => {
  console.log('userId:', userId);
  const appointments = await Appointment.find(
    { userId },
    { __v: 0, phone: 0, userId: 0 }
  );

  return appointments;
};

module.exports = { postReserve, getAllAppointmentsFromUser };
