const User = require('./User.model.js');

const signUp = async (data) => {
  const user = await User.create(data);
  return user;
};

module.exports = {
  signUp,
}