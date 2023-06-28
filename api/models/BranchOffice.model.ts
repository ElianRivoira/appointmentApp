import mongoose from 'mongoose';
import calculateShifts from '../utils/calculateShifts';

// An interface that describes the properties
// that are requried to create a new BranchOffice
export interface BranchOfficeAttrs {
  name: string;
  email: string;
  phone: number;
  capacity: string;
  openHour: string;
  closeHour: string;
}

// An interface that describes the properties
// that a BranchOffice Model has
interface BranchOfficeModel extends mongoose.Model<BranchOfficeDoc> {
  build(attrs: BranchOfficeAttrs): BranchOfficeDoc;
  setShifts(
    date: Date,
    shifts: {
      [key: string]: string[];
    }
  ): void;
}

// An interface that describes the properties
// that a BranchOffice Document has
export interface BranchOfficeDoc extends mongoose.Document {
  name: string;
  email: string;
  phone: number;
  capacity: string;
  openHour: string;
  closeHour: string;
  appointments: string[];
  shifts: {
    [key: string]: string[];
  };
  setShifts(
    date: Date,
    shifts: {
      [key: string]: string[];
    },
    returnObj?: boolean
  ): {
    [key: string]: string[];
  };
}

const branchOfficeSchema = new mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
    },
  ],
  shifts: {
    type: Object,
    default: {},
  },
});

branchOfficeSchema.statics.build = (attrs: BranchOfficeAttrs) => {
  return new BranchOffice(attrs);
};

branchOfficeSchema.methods.setShifts = function (
  date: Date,
  shifts: {
    [key: string]: string[];
  },
  returnObj?: boolean
): {
  [key: string]: string[];
} {
  const shiftsArray = calculateShifts(this.openHour, this.closeHour);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  let returnShifts: {
    [key: string]: string[];
  } = {};

  if (!(month % 2 === 0)) {
    if (month === 3) {
      for (let i = day; i < 29; i++) {
        const dateFormatted = new Date(year, month, i).toLocaleString().split(',')[0];
        returnObj ? (returnShifts[dateFormatted] = shiftsArray) : (shifts[dateFormatted] = shiftsArray);
      }
    } else {
      for (let i = day; i < 31; i++) {
        const dateFormatted = new Date(year, month, i).toLocaleString().split(',')[0];
        returnObj ? (returnShifts[dateFormatted] = shiftsArray) : (shifts[dateFormatted] = shiftsArray);
      }
    }
  } else {
    for (let i = day; i < 32; i++) {
      const dateFormatted = new Date(year, month, i).toLocaleString().split(',')[0];
      returnObj ? (returnShifts[dateFormatted] = shiftsArray) : (shifts[dateFormatted] = shiftsArray);
    }
  }
  return returnShifts;
};

branchOfficeSchema.pre('save', async function (next) {
  const self = this as unknown as BranchOfficeDoc;
  let date = new Date();
  self.setShifts(date, self.shifts);
  let month = date.getMonth();
  date.setMonth(month + 1);
  date.setDate(1);
  self.setShifts(date, self.shifts);
  month = date.getMonth();
  date.setMonth(month + 1);
  date.setDate(1);
  self.setShifts(date, self.shifts);
  return next();
});

const BranchOffice = mongoose.model<BranchOfficeDoc, BranchOfficeModel>('BranchOffice', branchOfficeSchema);

export default BranchOffice;
