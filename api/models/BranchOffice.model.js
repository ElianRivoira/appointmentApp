const { Schema, model } = require('mongoose');

const branchOffice = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  openHour: {
    type: String,
    required: true,
  },
  closeHour: {
    type: String,
    required: true,
  },
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
    },
  ],
});

const BranchOffice = model('BranchOffice', branchOffice);

module.exports = BranchOffice;
