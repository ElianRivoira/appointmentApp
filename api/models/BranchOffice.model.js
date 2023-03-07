const { Schema, model } = require('mongoose');
const { calculateShifts } = require('../utils/calculateShifts');

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
  shifts: {
    type: Object,
    default: {},
  },
});

branchOffice.pre('save', async function (next) {
  let date = new Date();
  this.setShifts(date, this.shifts);
  let month = date.getMonth();
  date.setMonth(month + 1);
  date.setDate(1);
  this.setShifts(date, this.shifts);
  month = date.getMonth();
  date.setMonth(month + 1);
  date.setDate(1);
  this.setShifts(date, this.shifts);
  return next();
});

branchOffice.methods.setShifts = function (date, shifts) {
  const shiftsArray = calculateShifts(this.openHour, this.closeHour);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  if (!(month % 2 === 0)) {
    if (month === 3) {
      for (let i = day; i < 29; i++) {
        const dateFormatted = new Date(year, month, i)
          .toLocaleString()
          .split(',')[0];
        shifts[dateFormatted] = shiftsArray;
      }
    }
    for (let i = day; i < 31; i++) {
      const dateFormatted = new Date(year, month, i)
        .toLocaleString()
        .split(',')[0];
      shifts[dateFormatted] = shiftsArray;
    }
  } else {
    for (let i = day; i < 32; i++) {
      const dateFormatted = new Date(year, month, i)
        .toLocaleString()
        .split(',')[0];
      shifts[dateFormatted] = shiftsArray;
    }
  }
};

const BranchOffice = model('BranchOffice', branchOffice);

module.exports = BranchOffice;
