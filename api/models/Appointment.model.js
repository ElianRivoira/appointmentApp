const { Schema, model } = require('mongoose');

const appointmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  creationDate: {
    type: Date,
    // required: true,
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'BranchOffice',
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

appointmentSchema.pre('save', async function (next) {
  const date = new Date()
  this.creationDate = date;
  return next();
});

const Appointment = model('Appointment', appointmentSchema);

module.exports = Appointment;
