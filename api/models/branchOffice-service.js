const Branch = require('./BranchOffice.model');

const postBranch = async (data) => {
  const branch = await Branch.create(data);
  return branch;
};

const getAllBranches = async () => {
  const branches = await Branch.find({}, { __v: 0 }).populate({
    path: 'appointments',
    options: { populate: { path: 'branch' } },
  });
  return branches;
};

const getBranchByName = async (name) => {
  const branch = await Branch.findOne({ name }).populate({
    path: 'appointments',
    options: { populate: { path: 'branch' } },
  });
  return branch;
};

const getBranch = async (id) => {
  const branch = await Branch.findById(id).populate({
    path: 'appointments',
    options: { populate: { path: 'branch' } },
  });
  return branch;
};

const putBranch = async (id, data) => {
  const branch = await Branch.findByIdAndUpdate(id, data, {
    new: true,
  }).populate({
    path: 'appointments',
    options: { populate: { path: 'branch' } },
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
