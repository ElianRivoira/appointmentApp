const appointmentService = require('../../models/appointment-service');

const httpPostReserve = async (req, res, next) => {
  try {
    const reserve = await appointmentService.postReserve({
      userId: req.body.userId,
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

const httpGetAllAppointmentsFromUser = async (req, res, next) => {
  try {
    const reserves = await appointmentService.getAllAppointmentsFromUser(
      req.params.id
    );
    res.status(200).send(reserves);
  } catch (e) {
    next(e);
  }
};

const httpGetOneAppointment = async (req, res, next) => {
  try {
    const reserve = await appointmentService.getOneAppointment(
      req.params.id
    );
    res.status(200).send(reserve);
  } catch (e) {
    next(e);
  }
};

module.exports = { httpPostReserve, httpGetAllAppointmentsFromUser, httpGetOneAppointment };
