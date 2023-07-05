import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import cron from 'node-cron';

import appointmentService from '../../models/appointment-service';
import branchService from '../../models/branchOffice-service';
import { ServerError } from '../../errors/server-error';
import { RequestValidationError } from '../../errors/request-validation-error';
import setReservesMetrics from '../../utils/setMetrics';
import { IAllBranchesMetrics } from '../../interfaces/IMetrics';
import { sendAppointmentProof } from '../../utils/emails';

const httpPostReserve = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  try {
    const reserve = await appointmentService.postReserve({
      userId: req.body.userId,
      date: req.body.date,
      branch: req.body.branch,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    });
    reserve && sendAppointmentProof(reserve)
    res.status(201).send(reserve);
  } catch (e) {
    throw new ServerError(e);
  }
};

let savedMetrics: IAllBranchesMetrics;
cron.schedule(
  '* * * * *',
  async () => {
    savedMetrics = await setReservesMetrics();
    console.log('cron metrics executed');
  },
  {
    timezone: 'America/Buenos_Aires',
  }
);

const httpCalculateMetrics = async (req: Request, res: Response) => {
  try {
    res.send(savedMetrics);
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
    const editedReserve = await appointmentService.putAppointment(req.params.id, { status: 'confirmed' });
    res.send(editedReserve);
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpCancelAppointment = async (req: Request, res: Response) => {
  try {
    const editedReserve = await appointmentService.cancelAppointment(req.params.id, req.body.cancelReason);
    res.send(editedReserve);
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpCreateProof = async (req: Request, res: Response) => {
  try {
    res.sendStatus(201);
  } catch (e) {
    throw new ServerError(e);
  }
};

export default {
  httpPostReserve,
  httpGetAllAppointmentsFromUser,
  httpCalculateMetrics,
  httpGetOneAppointment,
  httpEditAppointment,
  httpConfirmAppointment,
  httpCancelAppointment,
  httpCreateProof,
};
