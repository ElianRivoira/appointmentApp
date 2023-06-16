import { Request, Response } from 'express';

import branchService from '../../models/branchOffice-service';
import { ServerError } from '../../errors/server-error';

const httpPostBranch = async (req: Request, res: Response) => {
  try {
    const branch = await branchService.postBranch({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      capacity: req.body.capacity,
      openHour: req.body.openHour,
      closeHour: req.body.closeHour,
    });
    res.status(201).send(branch);
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpGetAllBranches = async (req: Request, res: Response) => {
  try {
    const branches = await branchService.getAllBranches();
    res.status(200).send(branches);
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpGetBranch = async (req: Request, res: Response) => {
  try {
    const branch = await branchService.getBranch(req.params.id);
    res.send(branch);
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpEditBranch = async (req: Request, res: Response) => {
  try {
    const editedBranch = await branchService.putBranch(req.params.id, req.body);
    res.send(editedBranch);
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpGetBranchByName = async (req: Request, res: Response) => {
  try {
    const branch = await branchService.getBranchByName(req.params.name);
    res.send(branch);
  } catch (e) {
    throw new ServerError(e);
  }
};

export default {
  httpPostBranch,
  httpGetAllBranches,
  httpGetBranch,
  httpEditBranch,
  httpGetBranchByName,
};