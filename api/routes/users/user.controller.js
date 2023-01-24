const { userLogin } = require('../../models/user-service');

async function httpUserLogin(req, res) {
  const user = req.body;

  if (!user.username) {
    res.status(401).json({
      error: 'Required user property',
    });
  }
  if (!user.password) {
    res.status(401).json({
      error: 'Required password',
    });
  }

  const loggedUser = await userLogin(user);

  res.status(200).json({
    userCredentials: loggedUser,
  });
}

module.exports = { httpUserLogin };
