const { Schema, model } = require('mongoose')

const branchOffice = new Schema({
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
})

const BranchOffice = model('BranchOffice', branchOffice)

module.exports = BranchOffice;