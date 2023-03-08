const userService = require('../../models/user-service');
const branchService = require('../../models/branchOffice-service');

const createOperator = async (req, res, next) => {
  try {
    const { name, email, dni, password, branch, phone } = req.body;
    const branchOffice = await branchService.getBranchByName(branch);
    const branchId = branchOffice._id;
    const operator = await userService.postOperator({
      name,
      email,
      dni,
      password,
      branchId,
      phone,
    });
    res.send(operator);
  } catch (e) {
    next(e);
  }
};

const getOperators = async (req, res, next) => {
  try {
    const operators = await userService.getOperators();
    res.send(operators);
  } catch (e) {
    next(e);
  }
};

const getOneOperator = async (req, res, next) => {
  try {
    const { id } = req.params;
    const operator = await userService.getOneOperator(id);
    res.send(operator);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createOperator,
  getOperators,
  getOneOperator,
};
