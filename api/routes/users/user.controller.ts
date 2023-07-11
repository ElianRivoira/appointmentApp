import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import userService from '../../models/user-service';
import branchService from '../../models/branchOffice-service';
import { sendPasswordChangerEmail } from '../../utils/emails';
import { ServerError } from '../../errors/server-error';
import { RequestValidationError } from '../../errors/request-validation-error';
import { validateRecoverToken, validateToken } from '../../utils/tokens';
import { BadRequestError } from '../../errors/bad-request-error';

const httpSignUp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  try {
    const user = await userService.signUp({
      name: req.body.name,
      email: req.body.email,
      dni: req.body.dni,
      password: req.body.password,
    });
    res.status(201).send(user);
  } catch (e) {
    throw new ServerError(e);
  }
};

async function httpUserLogin(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  try {
    const user = req.body;

    const response = await userService.userLogin(user);

    // response &&
    //   res.cookie('session', response.token, {
    //     sameSite: 'none',
    //     secure: true,
    //     httpOnly: true,
    //     path: '/api',
    //   });

    res.send(response);
  } catch (e) {
    throw new ServerError(e);
  }
}

const httpGetUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  try {
    if (req.headers) {
      const token = req.headers.authorization;
      if (token) {
        const { user } = validateToken(token);
        const loggedUser = await userService.getLoggedUser(user.id);
        res.send(loggedUser);
      }
    }
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpUpdateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  try {
    const userData = req.body;
    const findedCoincidence = await userService.getOneUser({ email: userData.email });
    if (findedCoincidence?.id !== userData.id) {
      throw new BadRequestError('Ya existe una cuenta con ese email');
    }

    const branch = await branchService.getBranchByName(userData.branch);
    if (branch) {
      const updatedUser = await userService.updateUser(userData, branch, userData.id);
      res.send(updatedUser);
    }
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpUpdatePassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  try {
    const data = req.body;
    if(data.email){
      const updatedUser = await userService.updatePassword(data.password, data.email);
      res.send(updatedUser);
    }else if (data.id){
      const updatedUser = await userService.updatePassword(data.password, undefined, data.id);
      res.send(updatedUser);
    }
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpForgotPassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  try {
    const { email } = req.body;
    const response = await userService.forgotPassword(email);
    response ? res.sendStatus(200) : res.sendStatus(400);
  } catch (e) {
    throw new ServerError(e);
  }
};

const httpRecoverPassword = async (req: Request, res: Response) => {
  const token = String(req.query.token);
  try {
    const decodedToken = validateRecoverToken(token);
    if (decodedToken) res.send(decodedToken.email);
    else throw new BadRequestError('El token es inválido o ha expirado');
  } catch (e) {
    throw new BadRequestError('El token es inválido o ha expirado');
  }
};

export default {
  httpUserLogin,
  httpSignUp,
  httpGetUser,
  httpUpdateUser,
  httpUpdatePassword,
  httpForgotPassword,
  httpRecoverPassword,
};
