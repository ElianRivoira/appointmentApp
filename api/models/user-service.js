const User = require('./User.model.js');

const signUp = async (data) => {
  const user = await User.create(data);
  return user;
};

async function userLogin(user) {
  try {
    const loggedUser = await User.findOne(user);
    return loggedUser;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  signUp,
  userLogin,
};