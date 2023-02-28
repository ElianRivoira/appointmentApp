const express = require('express');
const branchController = require('./branch.controller');

const router = express.Router();

router.post('/', branchController.httpPostBranch);

router.get('/', branchController.httpGetAllBranches);

router.put('/:id', branchController.httpEditBranch);

module.exports = router;
