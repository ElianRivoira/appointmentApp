const User = require('./User.model.js');

const register = () => {};

async function userLogin(user) {
  const loggedUser = await User.findOne(user);
  if (!loggedUser) {
    throw new Error('User not Found');
  } else {
    return loggedUser;
  }
}

module.exports = {
  register,
  userLogin,
};
