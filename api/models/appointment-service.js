const Appointment = require('./Appointment.model');

const postReserve = async data => {
  const ap = await Appointment.findOne();
  if (ap.id) {
    let aux = ap.id.split('-');
    aux[0] = Number(aux[0]) + 1;
    const id = aux.join('-');
    const appointment = await Appointment.create({ ...data, id: id });
    return appointment;
  } else {
    const id = '1043812955480-01';
    const appointment = await Appointment.create({ ...data, id: id });
    return appointment;
  }
};

const getAllAppointmentsFromUser = async userId => {
  const appointments = await Appointment.find(
    { userId },
    { __v: 0, phone: 0, userId: 0 }
  );

  return appointments;
};

const getOneAppointment = async id => {
  const appointment = await Appointment.findOne(
    { _id: id },
    { __v: 0, userId: 0 }
  );

  return appointment;
};

const putAppointment = async (id, data) => {
  const appointment = await Appointment.findByIdAndUpdate(id, data, {
    new: true,
  });
  return appointment;
};

const deleteAppointment = async (id) => {
  await Appointment.findByIdAndDelete(id)
}

module.exports = {
  postReserve,
  getAllAppointmentsFromUser,
  getOneAppointment,
  putAppointment,
  deleteAppointment,
};
