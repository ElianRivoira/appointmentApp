import { Request, Response } from 'express';

import userService from '../../models/user-service';
import branchService from '../../models/branchOffice-service';
import { ServerError } from '../../errors/server-error';

const createOperator = async (req: Request, res: Response) => {
  try {
    const { name, email, dni, password, branch, phone } = req.body;
    const branchOffice = await branchService.getBranchByName(branch);
    const branchId = branchOffice?._id;
    const operator = await userService.postOperator({
      name,
      email,
      dni,
      password,
      branch: branchId,
      phone,
    });
    res.send(operator);
  } catch (e) {
    throw new ServerError(e);
  }
};

const getOperators = async (req: Request, res: Response) => {
  try {
    const operators = await userService.getOperators();
    res.send(operators);
  } catch (e) {
    throw new ServerError(e);
  }
};

const getOneOperator = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const operator = await userService.getOneOperator(id);
    res.send(operator);
  } catch (e) {
    throw new ServerError(e);
  }
};

export default {
  createOperator,
  getOperators,
  getOneOperator,
};
