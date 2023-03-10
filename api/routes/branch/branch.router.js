const express = require('express');
const branchController = require('./branch.controller');

const router = express.Router();

router.post('/', branchController.httpPostBranch);

router.get('/', branchController.httpGetAllBranches);

router.get('/:id', branchController.httpGetBranch);

router.put('/:id', branchController.httpEditBranch);

router.get('/name/:name', branchController.httpGetBranchByName);

module.exports = router;
