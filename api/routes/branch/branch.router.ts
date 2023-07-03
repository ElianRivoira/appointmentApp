import express from 'express';

import branchController from './branch.controller';
import { validateLoggedAdmin, validateLoggedUser } from '../../middlewares/userValidator';
import { validatePostBranch } from '../../middlewares/branchValidator';

const router = express.Router();

router.post('/', validateLoggedAdmin, validatePostBranch, branchController.httpPostBranch);

router.get('/', validateLoggedUser, branchController.httpGetAllBranches);

router.get('/:id', validateLoggedUser, branchController.httpGetBranch);

router.put('/:id', validateLoggedAdmin, branchController.httpEditBranch);

router.get('/name/:name', validateLoggedUser, branchController.httpGetBranchByName);

router.delete('/:id', validateLoggedAdmin, branchController.httpDeleteBranch);

export default router;
