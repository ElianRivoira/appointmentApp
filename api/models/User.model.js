/* eslint-disable no-underscore-dangle */
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  phone: {
    type: Number,
  },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'BranchOffice',
  },
  role: {
    type: String,
    enum: ['user', 'operator', 'admin'],
  },
});

userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return next();
});

userSchema.methods.isValidPassword = async function (inputPassword) {
  const hashedPassword = this.password;
  const isMatched = await bcrypt.compare(inputPassword, hashedPassword);
  return isMatched;
};

const User = model('User', userSchema);

module.exports = User;
