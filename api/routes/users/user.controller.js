const userService = require('../../models/user-service');

const httpSignUp = async (req, res, next) => {
  try {
    const user = await userService.signUp({
      name: req.body.name,
      email: req.body.email,
      dni: req.body.dni,
      password: req.body.password,
    })
    res.status(201).send(user);
  } catch (e) {
    next(e)
  }
}

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

  const loggedUser = await userService.userLogin(user);

  res.status(200).json({
    userCredentials: loggedUser,
  });
}

module.exports = { httpUserLogin, httpSignUp };