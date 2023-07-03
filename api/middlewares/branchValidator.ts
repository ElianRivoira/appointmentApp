import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

const validatePostBranch = [
  body('email').isEmail().withMessage('Debe ingresar un correo electrónico válido'),
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('phone')
    .notEmpty()
    .withMessage('El número de teléfono de contacto del paciente es requerido')
    .isMobilePhone('es-AR')
    .withMessage(
      'El número de teléfono de contacto del paciente debe cumplir el formato estándar de Arg +549(característica)(N° sin el 15)'
    ),
    body('capacity').notEmpty().withMessage('La capacidad máxima es requerida'),
    body('openHour').notEmpty().withMessage('El horario de inicio es requerido'),
    body('closeHour').notEmpty().withMessage('El horario de cierre es requerido'),
];

export { validatePostBranch }