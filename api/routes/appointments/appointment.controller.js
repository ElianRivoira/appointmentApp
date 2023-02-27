const appointmentService = require('../../models/appointment-service');

const httpPostReserve = async (req, res, next) => {
  try {
    const reserve = await appointmentService.postReserve({
      userId: req.body.userId,
      date: req.body.date,
      branch: req.body.branch,
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
    const reserve = await appointmentService.getOneAppointment(req.params.id);
    res.status(200).send(reserve);
  } catch (e) {
    next(e);
  }
};

const httpEditAppointment = async (req, res, next) => {
  try {
    const editedReserve = await appointmentService.putAppointment(
      req.params.id,
      req.body
    );
    res.send(editedReserve);
  } catch (e) {
    next(e);
  }
};

const httpDeleteAppointment = async (req, res, next) => {
  try {
    await appointmentService.deleteAppointment(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  httpPostReserve,
  httpGetAllAppointmentsFromUser,
  httpGetOneAppointment,
  httpEditAppointment,
  httpDeleteAppointment,
};
