import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

const validatePostAppointment = [
  body('email').isEmail().withMessage('Debe ingresar un correo electrónico válido'),
  body('name').notEmpty().withMessage('El nombre es requerido'),
  body('phone')
    .notEmpty()
    .withMessage('El número de teléfono de contacto del paciente es requerido')
    .isMobilePhone('es-AR')
    .withMessage(
      'El número de teléfono de contacto del paciente debe cumplir el formato estándar de Arg +549(característica)(N° sin el 15)'
    ),
    body('branch').notEmpty().withMessage('La sucursal es requerida'),
];

export { validatePostAppointment }
