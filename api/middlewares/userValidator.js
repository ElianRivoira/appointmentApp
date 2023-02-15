const { check, oneOf } = require('express-validator');
const { validateResult } = require('../utils/validate');
const User = require('../models/User.model.js');

const validateSignUp = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email')
    .isEmail()
    .bail()
    .custom(async (value) => {
      const userExists = await User.findOne({ email: value });
      if (userExists) throw new Error('Ya existe una cuenta con ese email');
    }),
  check('dni').custom(async (value) => {
    const userExists = await User.findOne({ dni: value });
    if (userExists) throw new Error('Ya existe una cuenta con ese dni');
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateSignUp
};