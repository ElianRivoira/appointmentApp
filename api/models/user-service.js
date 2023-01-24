const User = require('./User.model.js');

const signUp = async (data) => {
  const user = await User.create(data);
  return user;
};

async function userLogin(user) {
  const loggedUser = await User.findOne(user);
  if (!loggedUser) {
    throw new Error('User not Found');
  } else {
    return loggedUser;
  }
}

module.exports = {
  signUp,
  userLogin,
};