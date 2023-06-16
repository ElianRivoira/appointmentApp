import express from 'express';

import operatorController from './operator.controller';
import { validateLoggedAdmin, validateLoggedUser } from '../../middlewares/userValidator';

const router = express.Router();

router.post('/', validateLoggedAdmin, operatorController.createOperator);

router.get('/', validateLoggedUser, operatorController.getOperators);

router.get('/:id', validateLoggedUser, operatorController.getOneOperator);

export default router