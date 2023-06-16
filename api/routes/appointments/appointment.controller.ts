import { Request, Response } from 'express';

import appointmentService from '../../models/appointment-service';
import branchService from '../../models/branchOffice-service';
import { ServerError } from '../../errors/server-error';

const httpPostReserve = async (req: Request, res: Response) => {
  try {
    const reserve = await appointmentService.postReserve({
      userId: req.body.userId,
      date: req.body.date,
      branch: req.body.branch,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    });
    res.status(201).send(reserve);
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpGetAllAppointmentsFromUser = async (req: Request, res: Response) => {
  try {
    const reserves = await appointmentService.getAllAppointmentsFromUser(req.params.id);
    res.status(200).send(reserves);
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpGetOneAppointment = async (req: Request, res: Response) => {
  try {
    const reserve = await appointmentService.getOneAppointment(req.params.id);
    res.status(200).send(reserve);
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpEditAppointment = async (req: Request, res: Response) => {
  try {
    const { date, branch, name, phone, email } = req.body;
    const branchOffice = await branchService.getBranchByName(branch);
    if (branchOffice) {
      const editedReserve = await appointmentService.putAppointment(req.params.id, {
        date,
        branch: branchOffice._id,
        name,
        phone,
        email,
      });
      res.send(editedReserve);
    }
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpConfirmAppointment = async (req: Request, res: Response) => {
  try {
    const editedReserve = await appointmentService.putAppointment(req.params.id, { confirmed: true });
    res.send(editedReserve);
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpDeleteAppointment = async (req: Request, res: Response) => {
  try {
    await appointmentService.deleteAppointment(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    throw new ServerError(e);
  }
};

export default {
  httpPostReserve,
  httpGetAllAppointmentsFromUser,
  httpGetOneAppointment,
  httpEditAppointment,
  httpConfirmAppointment,
  httpDeleteAppointment,
};
