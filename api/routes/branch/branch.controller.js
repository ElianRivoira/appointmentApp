const branchService = require('../../models/branchOffice-service');

const httpPostBranch = async (req, res, next) => {
  try {
    const branch = await branchService.postBranch({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      capacity: req.body.capacity,
      openHour: req.body.openHour,
      closeHour: req.body.closeHour,
    });
    res.status(201).send(branch);
  } catch (e) {
    next(e);
  }
};

const httpGetAllBranches = async (req, res, next) => {
  try {
    const branches = await branchService.getAllBranches(req.params.id);
    res.status(200).send(branches);
  } catch (e) {
    next(e);
  }
};

const httpEditBranch = async (req, res, next) => {
  try {
    const editedBranch = await branchService.putBranch(req.params.id, req.body);
    res.send(editedBranch);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  httpPostBranch,
  httpGetAllBranches,
  httpEditBranch,
};
