const User = require('./User.model.js');
const { generateToken } = require('../utils/tokens');

const signUp = async data => {
  const user = await User.create(data);
  return user;
};

async function userLogin(user) {
  try {
    const loggedUser = await User.findOne({ name: user.username });
    const match = await loggedUser.isValidPassword(user.password);
    if (match) {
      const tokenPayload = {
        id: loggedUser._id,
        username: loggedUser.name,
        dni: loggedUser.dni,
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
  const user = await User.findById(id);
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    dni: user.dni,
    phone: user.phone,
  };
};

const updateUser = async user => {
  const updatedUser = await User.findByIdAndUpdate(user.id, user, { new: true });
  return updatedUser;
};

module.exports = {
  signUp,
  userLogin,
  getLoggedUser,
  updateUser,
};
