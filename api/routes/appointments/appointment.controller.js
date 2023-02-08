const appointmentService = require('../../models/appointment-service');

const httpPostReserve = async (req, res, next) => {
  try {
    const reserve = await appointmentService.postReserve({
      date: req.body.date,
      branch: req.body.branch,
      time: req.body.time,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    });
    res.status(201).send(reserve);
  } catch (e) {
    next(e);
  }
};

module.exports = { httpPostReserve };
