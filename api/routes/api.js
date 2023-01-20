const express = require('express');

const api = express.Router();

api.use('/', (req, res) => {
  res.send('puto')
})

module.exports = api;