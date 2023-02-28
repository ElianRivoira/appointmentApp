const { Schema, model } = require('mongoose');

const operatorSchema = new Schema ({
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
  branch: {
    type: Schema.Types.ObjectId,
  }
});

const Operator = model('Operator', operatorSchema);

module.exports = Operator;