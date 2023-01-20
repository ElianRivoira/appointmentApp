/* eslint-disable no-underscore-dangle */
const { Schema, model } = require('mongoose');

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
  }
});

const User = model('User', userSchema);

module.exports = User;
