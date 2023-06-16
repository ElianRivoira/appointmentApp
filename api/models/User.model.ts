/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// An interface that describes the properties
// that are requried to create a new User
export interface UserAttrs {
  name: string;
  email: string;
  dni: number;
  password: string;
  phone?: number;
  branch?: string;
  role?: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
  isValidPassword(inputPassword: string): boolean;
}

// An interface that describes the properties
// that a User Document has
export interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  dni: number;
  password: string;
  phone: number;
  branch: string;
  role: string;
  appointments: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dni: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  appointments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  phone: {
    type: Number,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BranchOffice',
  },
  role: {
    type: String,
    enum: ['user', 'operator', 'admin'],
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return next();
});

userSchema.methods.isValidPassword = async function (inputPassword: string) {
  const hashedPassword = this.password;
  const isMatched = await bcrypt.compare(inputPassword, hashedPassword);
  return isMatched;
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
