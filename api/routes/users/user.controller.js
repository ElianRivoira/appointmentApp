const userService = require('../../models/user-service');
const branchService = require('../../models/branchOffice-service');
const { sendPasswordChangerEmail } = require('../../utils/emails');

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

  if (!user.email) {
    return res.status(401).json({
      error: 'Required user property',
    });
  }
  if (!user.password) {
    return res.status(401).json({
      error: 'Required password',
    });
  }

  const loggedUser = await userService.userLogin(user);

  res.send(loggedUser);
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
    const { id } = req.params;
    const user = req.body;
    const branch = await branchService.getBranchByName(user.branch)
    const updatedUser = await userService.updateUser(user, branch, id);
    res.send(updatedUser);
  } catch (e) {
    next(e);
  }
};

const httpUpdatePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { pass } = req.body;
    console.log('PASSWORD', pass);
    const updatedUser = await userService.updatePassword(id, pass);
    res.send(updatedUser);
  } catch (e) {
    next(e);
  }
};

const httpSendPassEmail = async (req, res, next) => {
  try {
    const data = req.body;
    sendPasswordChangerEmail(data);
    res.sendStatus(200)
  } catch (e) {
    next(e);
  }
};

module.exports = {
  httpUserLogin,
  httpSignUp,
  httpGetUser,
  httpUpdateUser,
  httpUpdatePassword,
  httpSendPassEmail,
};
