const { validateToken } = require('../utils/tokens');

const validateLoggedUser = async (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.sendStatus(401);

  try {
    const { user } = validateToken(token);
    if (!user) return res.sendStatus(401);
    req.user = user;
  } catch (e) {
    return res.sendStatus(401);
  }

  next();
};

const validateLoggedAdmin = async (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN_ROLE') return res.sendStatus(401);
  next();
};

// Combined middleware to authenticate admin
const validateAdmin = [validateLoggedUser, validateLoggedAdmin];

module.exports = {
  validateLoggedUser,
  validateAdmin,
};
