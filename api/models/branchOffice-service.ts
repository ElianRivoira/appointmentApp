import Branch, { BranchOfficeAttrs } from './BranchOffice.model';

const postBranch = async (data: BranchOfficeAttrs) => {
  const branch = Branch.build(data);
  await branch.save();
  return branch;
};

const getAllBranches = async () => {
  const branches = await Branch.find({}, { __v: 0 }).populate({
    path: 'appointments',
    options: { populate: { path: 'branch' } },
  });
  return branches;
};

const getBranchByName = async (name: string) => {
  const branch = await Branch.findOne({ name }).populate({
    path: 'appointments',
    options: { populate: { path: 'branch' } },
  });
  return branch;
};

const getBranch = async (id: string) => {
  const branch = await Branch.findById(id).populate({
    path: 'appointments',
    options: { populate: { path: 'branch' } },
  });
  return branch;
};

const putBranch = async (id: string, data: any) => {
  const branch = await Branch.findByIdAndUpdate(id, data, {
    new: true,
  }).populate({
    path: 'appointments',
    options: { populate: { path: 'branch' } },
  });
  return branch;
};

export default {
  postBranch,
  getAllBranches,
  getBranch,
  getBranchByName,
  putBranch,
};
