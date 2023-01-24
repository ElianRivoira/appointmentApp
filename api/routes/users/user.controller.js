const userService = require('../../models/user-service');

const signUp = async (req, res, next) => {
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

module.exports = {
  signUp
}