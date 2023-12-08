const Schema = require('mongoose').Schema;
const db = require('../config/db');

const CompanyMember = db.model('CompanyMember', {
  firstname: String,
  lastname: String,
  domain: String,
  username: String,
  _hardwares: [{
    type: Schema.Types.ObjectId,
    ref: 'Hardware'
  }],
  _softwares: [{
    type: Schema.Types.ObjectId,
    ref: 'Software'
  }],
});

module.exports = CompanyMember;