const bcrypt = require('bcrypt');
const User = require('./User.model.js');
const { generateToken } = require('../utils/tokens');

const signUp = async data => {
  const user = await User.create({ ...data, role: 'user' });
  return user;
};

const postOperator = async ({ name, email, dni, password, branchId, phone }) => {
  const operator = await User.create({
    name,
    email,
    dni,
    password,
    branch: branchId,
    role: 'operator',
    phone,
  });
  return operator;
};

const getOperators = async () => {
  const operators = await User.find({ role: 'operator' }, {__v: 0, password: 0}).populate('branch');
  return operators;
};

const getOneOperator = async (id) => {
  const operator = await User.findOne({ role: 'operator', _id: id }, {__v: 0, password: 0}).populate('branch');
  return operator;
};

async function userLogin(user) {
  try {
    const loggedUser = await User.findOne({ email: user.email });
    const match = await loggedUser?.isValidPassword(user.password);
    if (match) {
      const tokenPayload = {
        id: loggedUser._id,
        username: loggedUser.name,
        dni: loggedUser.dni,
        role: loggedUser.role,
      };
      const token = generateToken(tokenPayload);
      return {
        user: loggedUser,
        token,
      };
    }
  } catch (e) {
    throw new Error(e);
  }
}

const getLoggedUser = async id => {
  const user = await User.findById(id, { password: 0, __v: 0 }).populate(
    'branch'
  );
  return user;
};

const updateUser = async (user, branch, id) => {
  const updatedUser = await User.findByIdAndUpdate(id, { name: user.name, dni: user.dni, email: user.email, phone: user.phone, branch: branch?._id }, {
    new: true,
  });
  return updatedUser;
};

const updatePassword = async (id, pass) => {
  const hash = await bcrypt.hash(pass, 10);
  const user = await User.findByIdAndUpdate(
    id,
    { password: hash },
    {
      new: true,
    }
  );
  return user;
};

module.exports = {
  signUp,
  postOperator,
  getOperators,
  getOneOperator,
  userLogin,
  getLoggedUser,
  updateUser,
  updatePassword,
};
