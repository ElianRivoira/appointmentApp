const { Schema, model } = require('mongoose');

const appointmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Appointment = model('Appointment', appointmentSchema);

module.exports = Appointment;
