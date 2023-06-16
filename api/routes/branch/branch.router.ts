import express from 'express';

import branchController from './branch.controller';
import { validateLoggedAdmin, validateLoggedUser } from '../../middlewares/userValidator';

const router = express.Router();

router.post('/', validateLoggedAdmin, branchController.httpPostBranch);

router.get('/', validateLoggedUser, branchController.httpGetAllBranches);

router.get('/:id', validateLoggedUser, branchController.httpGetBranch);

router.put('/:id', validateLoggedAdmin, branchController.httpEditBranch);

router.get('/name/:name', validateLoggedUser, branchController.httpGetBranchByName);

export default router;
