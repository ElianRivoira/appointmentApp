import { Request, Response, NextFunction } from 'express';
import { check, body, cookie, validationResult } from 'express-validator';

import User from '../models/User.model';
import { RequestValidationError } from '../errors/request-validation-error';
import { validateToken } from '../utils/tokens';

const validateSignUp = [
  check('name').notEmpty().withMessage('El nombre es requerido'),
  check('email')
    .isEmail()
    .withMessage('Debe ingresar un correo electrónico válido')
    .bail()
    .custom(async value => {
      const userExists = await User.findOne({ email: value });
      if (userExists) throw new Error('Hemos detectado que el email ya está en uso');
    }),
  check('dni')
    .notEmpty()
    .withMessage('El dni es requerido')
    .bail()
    .custom(async value => {
      const userExists = await User.findOne({ dni: value });
      if (userExists) throw new Error('Hemos detectado una cuenta con ese DNI');
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    next();
  },
];

const validateLogin = [
  body('password').notEmpty().withMessage('La contraseña es requerida'),
  body('email').isEmail().withMessage('Debe ingresar un correo electrónico válido'),
];

const validateUpdateUser = [
  body('email')
    .isEmail()
    .withMessage('Debe ingresar un correo electrónico válido')
  //   .bail()
  //   .custom(async (value, { req }) => {
  //     const { user } = validateToken(req.session.token);
  //     console.log('LO')
  //     const userExists = await User.findOne({ email: value });
  //     if (userExists?._id !== user.id) throw new Error('Ya existe una cuenta con ese email');
  //   }),
  // (req: Request, res: Response, next: NextFunction) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     throw new RequestValidationError(errors.array());
  //   }
  //   next();
  // },
];

const validateLoggedUser = [
  check('Authorization').custom((value, { req }) => {
    if (!req.headers?.authorization) {
      throw new Error('Debe estar logueado en la aplicación');
    }
    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    next();
  },
];

const validateLoggedAdmin = [
  check('Authorization').custom((value, { req }) => {
    if (!req.headers?.authorization) {
      throw new Error('Debe estar logueado en la aplicación');
    } else {
      const { user } = validateToken(req.headers.authorization);
      if (user.role !== 'admin') {
        throw new Error('Debe tener permisos de administrador');
      } else return true;
    }
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    next();
  },
];

const validateLoggedOperator = [
  cookie('session').custom((value, { req }) => {
    if (!req.session.token) {
      throw new Error('Debe estar logueado en la aplicación');
    } else {
      const { user } = validateToken(req.session.token);
      if (user.role !== 'operator') {
        throw new Error('Debe tener permisos de operador');
      } else return true;
    }
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    next();
  },
];

export { validateSignUp, validateLogin, validateLoggedUser, validateLoggedAdmin, validateUpdateUser, validateLoggedOperator };
