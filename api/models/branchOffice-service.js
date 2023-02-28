const Branch = require('./BranchOffice.model');

const postBranch = async data => {
  const branch = await Branch.create(data);
  return branch;
};

const getAllBranches = async () => {
  const branches = await Branch.find({}, { __v: 0 });
  return branches;
};

const getBranchByName = async (data) => {
  const branch = await Branch.findOne({ name: data });
  return branch;
};

const getBranch = async (id) => {
  const branch = await Branch.findById(id);
  return branch;
};

const putBranch = async (id, data) => {
  const branch = await Appointment.findByIdAndUpdate(id, data, {
    new: true,
  });
  return branch;
};

module.exports = {
  postBranch,
  getAllBranches,
  getBranch,
  getBranchByName,
  putBranch,
};
