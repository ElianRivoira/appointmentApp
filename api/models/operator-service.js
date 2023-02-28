const Operator = require('./Operator.model');

const postOperator = async ({name, email, dni, password, branchId}) => {
  const operator = await Operator.create({name, email, dni, password, branch: branchId})
  return operator;
}

module.exports = {
  postOperator,
}