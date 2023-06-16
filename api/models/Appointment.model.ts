import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Appointment
export interface AppointmentAttrs {
  userId: string;
  id?: string;
  date: Date;
  branch: string;
  name: string;
  phone: number;
  email: string;
}

// An interface that describes the properties
// that a Appointment Model has
interface AppointmentModel extends mongoose.Model<AppointmentDoc> {
  build(attrs: AppointmentAttrs): AppointmentDoc;
}

// An interface that describes the properties
// that a Appointment Document has
export interface AppointmentDoc extends mongoose.Document {
  userId: string;
  id: string;
  date: Date;
  creationDate: Date;
  branch: string;
  name: string;
  phone: number;
  email: string;
  confirmed: boolean;
}

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
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
  confirmed: {
    type: Boolean,
    default: false,
  },
});

appointmentSchema.statics.build = (attrs: AppointmentAttrs) => {
  return new Appointment(attrs);
};

appointmentSchema.pre('save', async function (next) {
  const date = new Date()
  this.creationDate = date;
  return next();
});

const Appointment = mongoose.model<AppointmentDoc, AppointmentModel>('Appointment', appointmentSchema);

export default Appointment;
