const Appointment = require('./Appointment.model');
const BranchOffice = require('./BranchOffice.model');

const postReserve = async ({ userId, date, branch, name, phone, email }) => {
  const ap = await Appointment.find().sort({ _id: -1 }).limit(1);
  const branchOffice = await BranchOffice.findOne({ name: branch });
  if (ap[0]) {
    let aux = ap[0].id.split('-');
    aux[0] = Number(aux[0]) + 1;
    const id = aux.join('-');
    const appointment = await Appointment.create({
      userId,
      date,
      branch: branchOffice._id,
      name,
      phone,
      email,
      id: id,
    });
    branchOffice.appointments.push(appointment._id)
    await branchOffice.save()
    return appointment;
  } else {
    const id = '1043812955480-01';
    const appointment = await Appointment.create({
      userId,
      date,
      branch: branchOffice._id,
      name,
      phone,
      email,
      id: id,
    });
    branchOffice.appointments.push(appointment._id)
    await branchOffice.save()
    return appointment;
  }
};

const getAllAppointmentsFromUser = async userId => {
  const appointments = await Appointment.find(
    { userId },
    { __v: 0, phone: 0, userId: 0 }
  ).populate('branch');

  return appointments;
};

const getOneAppointment = async id => {
  const appointment = await Appointment.findOne(
    { _id: id },
    { __v: 0, userId: 0 }
  ).populate('branch');

  return appointment;
};

const putAppointment = async (id, data) => {
  const appointment = await Appointment.findByIdAndUpdate(id, data, {
    new: true,
  });
  return appointment;
};

const deleteAppointment = async id => {
  await Appointment.findByIdAndDelete(id);
};

module.exports = {
  postReserve,
  getAllAppointmentsFromUser,
  getOneAppointment,
  putAppointment,
  deleteAppointment,
};
