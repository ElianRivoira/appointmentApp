const userService = require('../../models/user-service');

const httpSignUp = async (req, res, next) => {
  try {
    const user = await userService.signUp({
      name: req.body.name,
      email: req.body.email,
      dni: req.body.dni,
      password: req.body.password,
    });
    res.status(201).send(user);
  } catch (e) {
    next(e);
  }
};

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

  res.status(200).json(loggedUser);
}

const httpGetUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userService.getLoggedUser(userId);
    res.send(user);
  } catch (e) {
    next(e);
  }
};

const httpUpdateUser = async (req, res, next) => {
  try {
    const user = req.body;
    const updatedUser = await userService.updateUser(user);
    res.send(updatedUser);
  } catch (e) {
    next(e);
  }
};

module.exports = { httpUserLogin, httpSignUp, httpGetUser, httpUpdateUser };
