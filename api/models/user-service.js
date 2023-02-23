const bcrypt = require('bcrypt');
const User = require('./User.model.js');
const { generateToken } = require('../utils/tokens');

const signUp = async data => {
  const user = await User.create(data);
  return user;
};

async function userLogin(user) {
  try {
    const loggedUser = await User.findOne({ email: user.email });
    const match = await loggedUser.isValidPassword(user.password);
    if (match) {
      const tokenPayload = {
        id: loggedUser._id,
        username: loggedUser.name,
        dni: loggedUser.dni,
      };
      console.log('AAAAAAAAAAAAAAAAA')
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
  const user = await User.findById(id);
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    dni: user.dni,
    phone: user.phone,
  };
};

const updateUser = async (user, id) => {
  const updatedUser = await User.findByIdAndUpdate(id, user, {
    new: true,
  });
  return updatedUser;
};

const updatePassword = async (id, pass) => {
  const hash = await bcrypt.hash(pass, 10);
  const user = await User.findByIdAndUpdate(id, {password: hash}, {
    new: true,
  });
  return user;
};

module.exports = {
  signUp,
  userLogin,
  getLoggedUser,
  updateUser,
  updatePassword,
};
