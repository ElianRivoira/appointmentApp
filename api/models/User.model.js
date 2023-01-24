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
    ref: 'Appointments',
  },
});

userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return next();
});

const User = model('User', userSchema);

module.exports = User;
