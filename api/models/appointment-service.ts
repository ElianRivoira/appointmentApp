import { ServerError } from '../errors/server-error';
import Appointment, { AppointmentAttrs, AppointmentDoc } from './Appointment.model';
import BranchOffice from './BranchOffice.model';

const postReserve = async ({ userId, date, branch, name, phone, email }: AppointmentAttrs) => {
  try {
    const ap = await Appointment.find().sort({ _id: -1 }).limit(1);
    const branchOffice = await BranchOffice.findOne({ name: branch });
    if (branchOffice) {
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
        branchOffice.appointments.push(appointment._id);
        await branchOffice.save();
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
        branchOffice.appointments.push(appointment._id);
        await branchOffice.save();
        return appointment;
      }
    }
  } catch (e) {
    throw new ServerError(e);
  }
};

const getAllAppointmentsFromUser = async (userId: string) => {
  try {
    const appointments = await Appointment.find({ userId }, { __v: 0, phone: 0, userId: 0 }).populate('branch');

    return appointments;
  } catch (e) {
    throw new ServerError(e);
  }
};

const getOneAppointment = async (id: string) => {
  try {
    const appointment = await Appointment.findOne({ _id: id }, { __v: 0, userId: 0 }).populate('branch');
    return appointment;
  } catch (e) {
    throw new ServerError(e);
  }
};

const putAppointment = async (id: string, data: object) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(id, data, {
      new: true,
    });
    return appointment;
  } catch (e) {
    throw new ServerError(e);
  }
};

const deleteAppointment = async (id: string) => {
  try {
    await Appointment.findByIdAndDelete(id);
  } catch (e) {
    throw new ServerError(e);
  }
};

export default {
  postReserve,
  getAllAppointmentsFromUser,
  getOneAppointment,
  putAppointment,
  deleteAppointment,
};
