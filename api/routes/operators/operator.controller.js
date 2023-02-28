const operatorService = require('../../models/operator-service');
const branchService = require('../../models/branchOffice-service');

const createOperator = async (req, res, next) => {
  try {
    const { name, email, dni, password, branch } = req.body;
    const branchOffice = await branchService.getBranchByName(branch);
    const branchId = branchOffice._id;
    const operator = await operatorService.postOperator({name, email, dni, password, branchId})
    res.send(operator);
  } catch (e) {
    next(e)
  }
}

module.exports = {
  createOperator,
}